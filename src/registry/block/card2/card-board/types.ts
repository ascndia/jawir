
export interface Cell {
    letter: string;
    row: number;
    col: number;
    selected: boolean;
    highlighted: boolean;
    partOfFoundWord: boolean;
  }
  
  export type Direction = 
    | 'horizontal' 
    | 'vertical' 
    | 'diagonal-up' 
    | 'diagonal-down' 
    | 'horizontal-reverse' 
    | 'vertical-reverse' 
    | 'diagonal-up-reverse' 
    | 'diagonal-down-reverse';
  
  export interface Word {
    word: string;
    found: boolean;
    startPosition?: { row: number; col: number };
    endPosition?: { row: number; col: number };
    direction?: Direction;
  }
  
  export interface GameSettings {
    gridSize: number;
    wordCount: number;
    timeLimit: number; // in seconds
    allowDiagonals: boolean;
    allowReverse: boolean;
  }
  
  export interface GameLevel {
    id: string;
    name: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
    settings: GameSettings;
  }
  
  export interface GameState {
    level: GameLevel;
    grid: Cell[][];
    words: Word[];
    startTime: number | null;
    endTime: number | null;
    score: number;
    timeElapsed: number;
    gameStatus: 'ready' | 'playing' | 'paused' | 'completed';
    selectionStart: { row: number; col: number } | null;
    selectionEnd: { row: number; col: number } | null;
  }
  