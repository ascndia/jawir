import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cell, GameLevel, GameState, Word } from './types';
import { 
  calculateScore, 
  formatTime, 
  getSelectedWord, 
  getLevels, 
  getSelectedCells, 
  initializeGame 
} from './utils';
import { toast } from 'sonner';

// Define the context type
type GameContextType = {
  state: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  restartGame: () => void;
  selectLevel: (level: GameLevel) => void;
  selectCell: (row: number, col: number) => void;
  checkWordSelection: () => void;
  resetSelection: () => void;
  highlightCells: (cells: { row: number; col: number }[]) => void;
  unhighlightAllCells: () => void;
  markCellsAsFound: (cells: { row: number; col: number }[]) => void;
};

// Define types for actions
type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'RESTART_GAME' }
  | { type: 'SELECT_LEVEL', payload: GameLevel }
  | { type: 'UPDATE_TIME', payload: number }
  | { type: 'SELECT_CELL_START', payload: { row: number; col: number } }
  | { type: 'SELECT_CELL_END', payload: { row: number; col: number } }
  | { type: 'MARK_WORD_FOUND', payload: { wordIndex: number, cells: { row: number; col: number }[] } }
  | { type: 'RESET_SELECTION' }
  | { type: 'HIGHLIGHT_CELLS', payload: { row: number; col: number }[] }
  | { type: 'UNHIGHLIGHT_ALL_CELLS' }
  | { type: 'END_GAME' };

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Initial state factory function
const createInitialState = (): GameState => {
  const levels = getLevels();
  return initializeGame(levels[0]); // Start with easy level
};

// Reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SELECT_LEVEL':
      return initializeGame(action.payload);
    
    case 'START_GAME':
      return {
        ...state,
        startTime: Date.now(),
        gameStatus: 'playing',
        score: 0,
        timeElapsed: 0,
      };
    
    case 'PAUSE_GAME':
      return {
        ...state,
        gameStatus: 'paused',
      };
    
    case 'RESUME_GAME':
      return {
        ...state,
        gameStatus: 'playing',
      };
    
    case 'RESTART_GAME':
      return initializeGame(state.level);
    
    case 'UPDATE_TIME':
      return {
        ...state,
        timeElapsed: action.payload,
        gameStatus: 
          action.payload >= state.level.settings.timeLimit 
            ? 'completed' 
            : state.gameStatus,
        endTime: 
          action.payload >= state.level.settings.timeLimit 
            ? Date.now() 
            : state.endTime,
        score: 
          action.payload >= state.level.settings.timeLimit
            ? calculateScore(
                state.words.filter(w => w.found),
                action.payload,
                state.level.settings.timeLimit
              )
            : state.score,
      };
    
    case 'SELECT_CELL_START':
      return {
        ...state,
        selectionStart: action.payload,
        selectionEnd: action.payload,
        grid: state.grid.map(row =>
          row.map(cell => ({
            ...cell,
            selected: 
              cell.row === action.payload.row && 
              cell.col === action.payload.col
          }))
        )
      };
    
    case 'SELECT_CELL_END':
      return {
        ...state,
        selectionEnd: action.payload,
        grid: state.grid.map(row =>
          row.map(cell => {
            const isSelected = getSelectedCells(
              state.grid,
              state.selectionStart,
              action.payload
            ).some(pos => pos.row === cell.row && pos.col === cell.col);
            
            return {
              ...cell,
              selected: isSelected
            };
          })
        )
      };
    
    case 'MARK_WORD_FOUND':
      // Update the found status for the word
      const updatedWords = [...state.words];
      updatedWords[action.payload.wordIndex].found = true;
      
      // Check if all words are found
      const allWordsFound = updatedWords.every(word => word.found);
      
      // Calculate score
      let newScore = calculateScore(
        updatedWords.filter(w => w.found), 
        state.timeElapsed,
        state.level.settings.timeLimit
      );
      
      // Update grid to mark cells as found
      const updatedGrid = state.grid.map(row =>
        row.map(cell => {
          const isPartOfWord = action.payload.cells.some(
            pos => pos.row === cell.row && pos.col === cell.col
          );
          
          return {
            ...cell,
            selected: false,
            partOfFoundWord: isPartOfWord ? true : cell.partOfFoundWord
          };
        })
      );
      
      return {
        ...state,
        words: updatedWords,
        grid: updatedGrid,
        score: newScore,
        selectionStart: null,
        selectionEnd: null,
        gameStatus: allWordsFound ? 'completed' : state.gameStatus,
        endTime: allWordsFound ? Date.now() : state.endTime,
      };
    
    case 'RESET_SELECTION':
      return {
        ...state,
        selectionStart: null,
        selectionEnd: null,
        grid: state.grid.map(row =>
          row.map(cell => ({
            ...cell,
            selected: false,
          }))
        )
      };
    
    case 'HIGHLIGHT_CELLS':
      return {
        ...state,
        grid: state.grid.map(row =>
          row.map(cell => ({
            ...cell,
            highlighted: action.payload.some(
              pos => pos.row === cell.row && pos.col === cell.col
            )
          }))
        )
      };
    
    case 'UNHIGHLIGHT_ALL_CELLS':
      return {
        ...state,
        grid: state.grid.map(row =>
          row.map(cell => ({
            ...cell,
            highlighted: false
          }))
        )
      };
    
    case 'END_GAME':
      return {
        ...state,
        gameStatus: 'completed',
        endTime: Date.now(),
        score: calculateScore(
          state.words.filter(w => w.found),
          state.timeElapsed,
          state.level.settings.timeLimit
        )
      };
    
    default:
      return state;
  }
};

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);
  
  // Timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    
    if (state.gameStatus === 'playing') {
      timerId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - (state.startTime || 0)) / 1000);
        dispatch({ type: 'UPDATE_TIME', payload: elapsed });
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [state.gameStatus, state.startTime]);
  
  // Check if the game is completed
  useEffect(() => {
    if (state.gameStatus === 'completed') {
      toast.success(`Game completed! Your score: ${state.score}`);
    }
  }, [state.gameStatus, state.score]);
  
  // Game control functions
  const startGame = () => dispatch({ type: 'START_GAME' });
  const pauseGame = () => dispatch({ type: 'PAUSE_GAME' });
  const resumeGame = () => dispatch({ type: 'RESUME_GAME' });
  const restartGame = () => dispatch({ type: 'RESTART_GAME' });
  const selectLevel = (level: GameLevel) => dispatch({ type: 'SELECT_LEVEL', payload: level });
  
  // Cell selection functions
  const selectCell = (row: number, col: number) => {
    if (state.gameStatus !== 'playing') return;
    
    if (!state.selectionStart) {
      dispatch({ type: 'SELECT_CELL_START', payload: { row, col } });
    } else {
      dispatch({ type: 'SELECT_CELL_END', payload: { row, col } });
    }
  };
  
  // Check if selected word is valid
  const checkWordSelection = () => {
    if (!state.selectionStart || !state.selectionEnd) return;
    
    const selectedWord = getSelectedWord(state.grid, state.selectionStart, state.selectionEnd);
    
    if (selectedWord) {
      const wordIndex = state.words.findIndex(
        word => word.word === selectedWord && !word.found
      );
      
      const reversedWord = selectedWord.split('').reverse().join('');
      const reversedWordIndex = state.words.findIndex(
        word => word.word === reversedWord && !word.found
      );
      
      const matchedIndex = wordIndex >= 0 ? wordIndex : reversedWordIndex;
      
      if (matchedIndex >= 0) {
        const selectedCells = getSelectedCells(state.grid, state.selectionStart, state.selectionEnd);
        dispatch({ 
          type: 'MARK_WORD_FOUND', 
          payload: { 
            wordIndex: matchedIndex, 
            cells: selectedCells 
          } 
        });
        
        // Check if all words are found after this one
        const allFound = state.words.every((w, index) => 
          w.found || index === matchedIndex
        );
        
        if (allFound) {
          dispatch({ type: 'END_GAME' });
        }
      } else {
        resetSelection();
      }
    } else {
      resetSelection();
    }
  };
  
  const resetSelection = () => dispatch({ type: 'RESET_SELECTION' });
  
  const highlightCells = (cells: { row: number; col: number }[]) => {
    dispatch({ type: 'HIGHLIGHT_CELLS', payload: cells });
  };
  
  const unhighlightAllCells = () => dispatch({ type: 'UNHIGHLIGHT_ALL_CELLS' });
  
  const markCellsAsFound = (cells: { row: number; col: number }[]) => {
    // Find which word this corresponds to
    const selectedWord = getSelectedWord(
      state.grid, 
      cells[0], 
      cells[cells.length - 1]
    );
    
    if (selectedWord) {
      const wordIndex = state.words.findIndex(
        word => word.word === selectedWord && !word.found
      );
      
      if (wordIndex >= 0) {
        dispatch({ 
          type: 'MARK_WORD_FOUND', 
          payload: { 
            wordIndex, 
            cells 
          } 
        });
      }
    }
  };
  
  return (
    <GameContext.Provider
      value={{
        state,
        startGame,
        pauseGame,
        resumeGame,
        restartGame,
        selectLevel,
        selectCell,
        checkWordSelection,
        resetSelection,
        highlightCells,
        unhighlightAllCells,
        markCellsAsFound
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook for using the game context
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
