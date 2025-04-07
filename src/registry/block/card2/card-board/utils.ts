
import { Cell, Direction, GameLevel, GameSettings, GameState, Word } from "./types";

// Dictionary of words for different difficulty levels
const wordDictionaries = {
  easy: [
    "CAT", "DOG", "RUN", "SUN", "HAT", "MAP", "FUN", "BOX", "TOP", "BIG",
    "JAR", "CUP", "BAT", "FOX", "PEN", "BUS", "CAR", "RED", "SIT", "LOG"
  ],
  medium: [
    "APPLE", "BREAD", "CLOUD", "DANCE", "EARTH", "FRUIT", "GLASS", "HOUSE", "JUICE", "KITES",
    "LEMON", "MANGO", "NIGHT", "OCEAN", "PLANE", "QUEEN", "RIVER", "SUGAR", "TOWER", "WATER"
  ],
  hard: [
    "ASTRONAUT", "BLUEPRINT", "CALENDAR", "DINOSAUR", "ELEPHANT", "FRACTION", "GARDENING", "HARMONICA", "ICEBERG", "JELLYFISH",
    "KANGAROO", "LIGHTNING", "MOUNTAIN", "NOTEBOOK", "OBSTACLE", "PARACHUTE", "QUARANTINE", "RASPBERRY", "SCARECROW", "TELEPHONE"
  ],
  expert: [
    // Original words
    "ALGORITHM", "BANDWIDTH", "COMPILER", "DEBUGGING", "ENCRYPTION", "FIREWALL", "GIGABYTE", "HARDWARE", "INTERFACE", "JAVASCRIPT",
    "KEYBOARD", "LOCALHOST", "MICROCHIP", "NETWORK", "OPERATING", "PROTOCOL", "QUANTUM", "RUNTIME", "SOFTWARE", "TERMINAL",
    "UTILITIES", "VARIABLE", "WIRELESS", "XPATH", "YOUTUBE", "ZETTABYTE",
    "ANALYTICS", "BLOCKCHAIN", "CACHEABLE", "DATABASE", "ENDPOINT", "FRAMEWORK", "GRAPHICS", "HYPERLINK", "ITERATION", "JOYSTICK",
    "KUBERNETES", "LIBRARIES", "MALICIOUS", "NAMESPACE", "OPTIMIZE", "PROCESSOR", "QUICKSORT", "RECURSION", "SERVERLESS", "THREADING",
    
    // Additional 300 words for expert level
    "ABSTRACT", "ACCESSOR", "ADAPTIVE", "AGGREGATE", "ALLOCATE", "ANIMATOR", "ANONYMOUS", "APERTURE", "APPRAISAL", "ARCHITECT",
    "ARCHIVING", "ARGUMENT", "ARTIFACT", "ASSEMBLER", "ASSERTION", "ASSOCIATE", "ATTRIBUTE", "AUTHENTIC", "AUTOMATED", "AUXILIARY",
    "BACKTRACK", "BENCHMARK", "BIOMETRIC", "BOOTSTRAP", "BOUNDARY", "BRANCHING", "BROADCAST", "BUFFERING", "BYTECODE", "CALCULUS",
    "CALLBACK", "CAPACITY", "CAROUSEL", "CASCADE", "CATALYST", "CAVEAT", "CELLULAR", "CENTRIFY", "CHAMPION", "CHARACTER",
    "CHECKBOX", "CHROMATIC", "CIRCULAR", "CLAMPING", "CLASSICAL", "CLASSIFIER", "CLONABLE", "CLUSTERED", "COGNITIVE", "COHERENT",
    "COLLECTOR", "COLLINEAR", "COLLISION", "COMMAND", "COMMERCE", "COMMODITY", "COMPILER", "COMPONENT", "COMPOSITE", "COMPRESS",
    "COMPUTE", "CONCAVE", "CONCRETE", "CONCURRENT", "CONDITION", "CONFIGURE", "CONFLICT", "CONJUGATE", "CONNECTED", "CONNECTOR",
    "CONSTANT", "CONSTRAINT", "CONSTRUCT", "CONTAINER", "CONTEXT", "CONTINUOUS", "CONTOUR", "CONTRAST", "CONTROLLER", "CONVEX",
    "CORPORATE", "CORRELATE", "COUPLING", "COVERAGE", "CREATION", "CREDENTIAL", "CRITERIA", "CRITICAL", "CROSSOVER", "CRYPTIC",
    "CURRENCY", "CUSTOMARY", "CYLINDER", "DASHBOARD", "DATAFLOW", "DATATYPE", "DEADLOCK", "DEBUGGER", "DECODING", "DECOUPLED",
    "DEDICATED", "DEFERRED", "DEFICIENT", "DELEGATE", "DELIMITER", "DELIVERY", "DEMYSTIFY", "DEPENDENT", "DEPLOYED", "DEPRECATE",
    "DERIVATIVE", "DESIGNATE", "DESIGNER", "DESIRABLE", "DETECTIVE", "DEVELOPER", "DEVIATION", "DIALOGUE", "DIAMETER", "DICTIONARY",
    "DIFFUSION", "DIGITIZE", "DIRECTIVE", "DIRECTORY", "DISCOVERY", "DISCRETE", "DISPATCH", "DISTINCT", "DISTORTED", "DISTRIBUTE",
    "DIVERGENT", "DIVIDEND", "DIVISION", "DOCUMENT", "DOMINANT", "DOWNLOAD", "DRAGGABLE", "DRAWABLE", "DRIVABLE", "DUPLICATE",
    "DURATION", "DYNAMICS", "ECLECTIC", "ECOSYSTEM", "EFFICIENT", "ELABORATE", "ELASTIC", "ELEMENTAL", "ELEVATION", "ELIMINATE",
    "ELLIPTIC", "EMBEDDED", "EMERGENCE", "EMULATED", "ENCAPSULATE", "ENCODING", "ENCRYPTED", "ENDORSEMENT", "ENGAGEMENT", "ENGINEER",
    "ENHANCED", "ENSEMBLE", "ENTERPRISE", "ENVELOPE", "EQUALITY", "EQUATION", "EQUIPMENT", "ESSENTIAL", "ESTABLISH", "ESTIMATE",
    "EVALUATE", "EVIDENCE", "EVOLUTION", "EXCEPTION", "EXCLUSIVE", "EXECUTOR", "EXHAUSTER", "EXPANSION", "EXPERTISE", "EXPLICIT",
    "EXPLORER", "EXPOSURE", "EXTENSION", "EXTERNAL", "EXTRACTION", "FACTORIAL", "FAULTLESS", "FEASIBLE", "FEATURING", "FEEDBACK",
    "FINALIZE", "FIRMWARE", "FLAGGING", "FLEXIBLE", "FLOATING", "FLOWCHART", "FLUIDICS", "FOCUSING", "FORECAST", "FOREFRONT",
    "FORENSIC", "FORMATTER", "FORMULA", "FRAGMENT", "FRONTEND", "FRONTIER", "FUNCTION", "FUTURISTIC", "GALACTIC", "GAUSSIAN",
    "GENERATE", "GEOMETRY", "GRADIENT", "GRAMMAR", "GRAPHICAL", "GUARANTEE", "GUIDELINE", "HACKER", "HANDLING", "HAZARDOUS",
    "HEADLESS", "HEATMAP", "HIBERNATE", "HIERARCHY", "HIGHLIGHT", "HOLISTIC", "HOMOICONIC", "HORIZONTAL", "HORTICULTURE", "HUMANOID",
    "HYDRAULIC", "IDENTICAL", "IDENTIFIER", "IDEOLOGY", "ILLUSION", "IMITATION", "IMMINENT", "IMMUTABLE", "IMPLEMENT", "IMPORTANT"
  ]
};

// Generate the predefined levels with appropriate settings
export const getLevels = (): GameLevel[] => {
  return [
    {
      id: "easy",
      name: "Easy",
      description: "Perfect for beginners",
      difficulty: "easy",
      settings: {
        gridSize: 6,
        wordCount: 5,
        timeLimit: 180, // 3 minutes
        allowDiagonals: false,
        allowReverse: false
      }
    },
    {
      id: "medium",
      name: "Medium",
      description: "A bit more challenge",
      difficulty: "medium",
      settings: {
        gridSize: 10,
        wordCount: 8,
        timeLimit: 240, // 4 minutes
        allowDiagonals: true,
        allowReverse: false
      }
    },
    {
      id: "hard",
      name: "Hard",
      description: "For experienced players",
      difficulty: "hard",
      settings: {
        gridSize: 12,
        wordCount: 10,
        timeLimit: 300, // 5 minutes
        allowDiagonals: true,
        allowReverse: true
      }
    },
    {
      id: "expert",
      name: "Expert",
      description: "The ultimate challenge",
      difficulty: "expert",
      settings: {
        gridSize: 15,
        wordCount: 12,
        timeLimit: 420, // 7 minutes
        allowDiagonals: true,
        allowReverse: true
      }
    }
  ];
};

// Generate a random letter
const getRandomLetter = (): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters.charAt(Math.floor(Math.random() * letters.length));
};

// Select random words from dictionary based on level
export const selectRandomWords = (level: GameLevel): string[] => {
  const dictionary = wordDictionaries[level.difficulty];
  const words = [...dictionary];
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, level.settings.wordCount);
};

// Check if a word can be placed at a specific position and direction
const canPlaceWord = (
  grid: Cell[][],
  word: string,
  row: number,
  col: number,
  direction: Direction,
  gridSize: number
): boolean => {
  const wordLength = word.length;

  let rIncrement = 0;
  let cIncrement = 0;

  switch (direction) {
    case "horizontal":
      cIncrement = 1;
      break;
    case "vertical":
      rIncrement = 1;
      break;
    case "diagonal-down":
      rIncrement = 1;
      cIncrement = 1;
      break;
    case "diagonal-up":
      rIncrement = -1;
      cIncrement = 1;
      break;
    case "horizontal-reverse":
      cIncrement = -1;
      break;
    case "vertical-reverse":
      rIncrement = -1;
      break;
    case "diagonal-down-reverse":
      rIncrement = 1;
      cIncrement = -1;
      break;
    case "diagonal-up-reverse":
      rIncrement = -1;
      cIncrement = -1;
      break;
  }

  // Check if word fits in grid bounds
  let r = row;
  let c = col;
  for (let i = 0; i < wordLength; i++) {
    if (
      r < 0 || r >= gridSize ||
      c < 0 || c >= gridSize
    ) {
      return false;
    }

    // Check if cell is empty or has the same letter
    if (grid[r][c].letter !== "" && grid[r][c].letter !== word[i]) {
      return false;
    }

    r += rIncrement;
    c += cIncrement;
  }

  return true;
};

// Place a word on the grid
const placeWord = (
  grid: Cell[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): { startPosition: { row: number; col: number }, endPosition: { row: number; col: number } } => {
  let rIncrement = 0;
  let cIncrement = 0;

  switch (direction) {
    case "horizontal":
      cIncrement = 1;
      break;
    case "vertical":
      rIncrement = 1;
      break;
    case "diagonal-down":
      rIncrement = 1;
      cIncrement = 1;
      break;
    case "diagonal-up":
      rIncrement = -1;
      cIncrement = 1;
      break;
    case "horizontal-reverse":
      cIncrement = -1;
      break;
    case "vertical-reverse":
      rIncrement = -1;
      break;
    case "diagonal-down-reverse":
      rIncrement = 1;
      cIncrement = -1;
      break;
    case "diagonal-up-reverse":
      rIncrement = -1;
      cIncrement = -1;
      break;
  }

  let r = row;
  let c = col;
  
  // Start position
  const startPosition = { row, col };
  
  // Place each letter
  for (let i = 0; i < word.length; i++) {
    grid[r][c].letter = word[i];
    r += rIncrement;
    c += cIncrement;
  }
  
  // End position (last letter)
  const endPosition = { 
    row: row + (word.length - 1) * rIncrement, 
    col: col + (word.length - 1) * cIncrement 
  };

  return { startPosition, endPosition };
};

// Generate a grid with words placed according to level settings
export const generateGrid = (level: GameLevel, words: string[]): { grid: Cell[][], wordObjects: Word[] } => {
  const { gridSize, allowDiagonals, allowReverse } = level.settings;
  
  // Initialize empty grid
  const grid: Cell[][] = Array(gridSize)
    .fill(null)
    .map((_, row) =>
      Array(gridSize)
        .fill(null)
        .map((_, col) => ({
          letter: "",
          row,
          col,
          selected: false,
          highlighted: false,
          partOfFoundWord: false
        }))
    );

  // Prepare word placement data
  const wordObjects: Word[] = [];
  
  // Available directions based on settings
  let availableDirections: Direction[] = ["horizontal", "vertical"];
  
  if (allowDiagonals) {
    availableDirections = [
      ...availableDirections,
      "diagonal-down",
      "diagonal-up"
    ];
  }
  
  if (allowReverse) {
    const reverseDirections: Direction[] = availableDirections.map(dir => {
      if (dir.includes('reverse')) return dir;
      return `${dir}-reverse` as Direction;
    });
    
    availableDirections = [...availableDirections, ...reverseDirections];
  }

  // Try to place each word
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      const direction = availableDirections[Math.floor(Math.random() * availableDirections.length)];

      if (canPlaceWord(grid, word, row, col, direction, gridSize)) {
        const { startPosition, endPosition } = placeWord(grid, word, row, col, direction);
        
        wordObjects.push({
          word,
          found: false,
          startPosition,
          endPosition,
          direction
        });
        
        placed = true;
      }

      attempts++;
    }

    // If can't place after max attempts, skip this word
    if (!placed) {
      console.warn(`Could not place word: ${word}`);
    }
  }

  // Fill empty cells with random letters
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col].letter === "") {
        grid[row][col].letter = getRandomLetter();
      }
    }
  }

  return { grid, wordObjects };
};

// Initialize a new game state
export const initializeGame = (level: GameLevel): GameState => {
  const selectedWords = selectRandomWords(level);
  const { grid, wordObjects } = generateGrid(level, selectedWords);

  return {
    level,
    grid,
    words: wordObjects,
    startTime: null,
    endTime: null,
    score: 0,
    timeElapsed: 0,
    gameStatus: "ready",
    selectionStart: null,
    selectionEnd: null
  };
};

// Calculate score based on words found and time
export const calculateScore = (foundWords: Word[], timeElapsed: number, timeLimit: number): number => {
  const wordPoints = foundWords.length * 100;
  const timeBonus = Math.max(0, timeLimit - timeElapsed) * 2;
  
  return wordPoints + timeBonus;
};

// Format time in MM:SS format
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Check if a word is selected based on start and end positions
export const getSelectedWord = (
  grid: Cell[][],
  start: { row: number; col: number } | null,
  end: { row: number; col: number } | null
): string | null => {
  if (!start || !end) return null;

  const { row: startRow, col: startCol } = start;
  const { row: endRow, col: endCol } = end;

  // Determine direction
  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;
  
  // If not in a straight line, return null
  if (rowDiff !== 0 && colDiff !== 0 && Math.abs(rowDiff) !== Math.abs(colDiff)) {
    return null;
  }

  let letters = "";
  
  // If horizontal
  if (rowDiff === 0) {
    const step = colDiff > 0 ? 1 : -1;
    for (let c = startCol; c !== endCol + step; c += step) {
      letters += grid[startRow][c].letter;
    }
  }
  // If vertical
  else if (colDiff === 0) {
    const step = rowDiff > 0 ? 1 : -1;
    for (let r = startRow; r !== endRow + step; r += step) {
      letters += grid[r][startCol].letter;
    }
  }
  // If diagonal
  else {
    const rowStep = rowDiff > 0 ? 1 : -1;
    const colStep = colDiff > 0 ? 1 : -1;
    let r = startRow;
    let c = startCol;
    
    while (r !== endRow + rowStep && c !== endCol + colStep) {
      letters += grid[r][c].letter;
      r += rowStep;
      c += colStep;
    }
  }

  return letters;
};

// Get all cells that are part of a selected word
export const getSelectedCells = (
  grid: Cell[][],
  start: { row: number; col: number } | null,
  end: { row: number; col: number } | null
): { row: number; col: number }[] => {
  if (!start || !end) return [];

  const { row: startRow, col: startCol } = start;
  const { row: endRow, col: endCol } = end;

  // Determine direction
  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;
  
  // If not in a straight line, return empty array
  if (rowDiff !== 0 && colDiff !== 0 && Math.abs(rowDiff) !== Math.abs(colDiff)) {
    return [];
  }

  const cells: { row: number; col: number }[] = [];
  
  // If horizontal
  if (rowDiff === 0) {
    const step = colDiff > 0 ? 1 : -1;
    for (let c = startCol; c !== endCol + step; c += step) {
      cells.push({ row: startRow, col: c });
    }
  }
  // If vertical
  else if (colDiff === 0) {
    const step = rowDiff > 0 ? 1 : -1;
    for (let r = startRow; r !== endRow + step; r += step) {
      cells.push({ row: r, col: startCol });
    }
  }
  // If diagonal
  else {
    const rowStep = rowDiff > 0 ? 1 : -1;
    const colStep = colDiff > 0 ? 1 : -1;
    let r = startRow;
    let c = startCol;
    
    while (r !== endRow + rowStep && c !== endCol + colStep) {
      cells.push({ row: r, col: c });
      r += rowStep;
      c += colStep;
    }
  }

  return cells;
};
