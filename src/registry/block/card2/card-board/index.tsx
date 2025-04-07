import React, { useEffect } from 'react';
import { GameProvider, useGame } from './useGame';
export interface CellType {
    letter: string;
    row: number;
    col: number;
    selected: boolean;
    highlighted: boolean;
    partOfFoundWord: boolean;
  }
  import { cn } from '@/lib/utils';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Cell: React.FC<{
  cell: CellType;
  onClick: () => void;
  onMouseEnter: () => void;
}> = ({ cell, onClick, onMouseEnter }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center font-bold text-lg sm:text-xl rounded-md cursor-pointer transition-all select-none',
        'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12',
        'border border-game-accent/50',
        {
          'bg-game-primary text-white': cell.selected,
          'bg-game-highlight animate-pulse-highlight': cell.highlighted && !cell.selected,
          'bg-game-secondary text-white': cell.partOfFoundWord && !cell.selected,
          'bg-white text-game-text hover:bg-game-accent/20': 
            !cell.selected && !cell.highlighted && !cell.partOfFoundWord
        }
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {cell.letter}
    </div>
  );
};

const GameBoard: React.FC = () => {
  const { 
    state, 
    selectCell, 
    checkWordSelection,
    resetSelection,
    startGame
  } = useGame();
  
  const { grid, gameStatus, selectionStart } = state;
  
  // Handle mouse up event to check word selection
  useEffect(() => {
    const handleMouseUp = () => {
      if (gameStatus === 'playing' && selectionStart) {
        checkWordSelection();
      }
    };
    
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gameStatus, selectionStart, checkWordSelection]);
  
  // Handle escape key to reset selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetSelection();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [resetSelection]);
  
  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (gameStatus === 'playing') {
      selectCell(row, col);
    }
  };
  
  // Handle mouse enter on cell (for dragging selection)
  const handleCellMouseEnter = (row: number, col: number) => {
    if (gameStatus === 'playing' && selectionStart) {
      selectCell(row, col);
    }
  };
  
  return (
    <Card className="w-full">
        <CardHeader>
        <Button className='w-full' onClick={() => startGame()}>Play</Button>
        </CardHeader>
    <div 
      className={cn(
        "grid gap-1 sm:gap-2 mx-auto rounded-xl pb-6",
        { "opacity-80 cursor-not-allowed": gameStatus !== 'playing' }
      )}
      style={{
        gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
        maxWidth: `${Math.min(grid.length * 3.5, 40)}rem`
      }}
    >
        {grid.map((row) =>
          row.map((cell) => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              onClick={() => handleCellClick(cell.row, cell.col)}
              onMouseEnter={() => handleCellMouseEnter(cell.row, cell.col)}
            />
          ))
        )}
      </div>
    </Card>
  );
};

export const CardBoard = () => {
  return (
    <GameProvider>
        <GameBoard />
    </GameProvider>
  );
}
