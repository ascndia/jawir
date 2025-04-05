"use client";
import { useState, useEffect } from 'react';

const WIDTH =40;
const HEIGHT = 25;

// Define tiles and their adjacency rules
type Tile = {
  id: number;
  color: string;
  name: string;
  rules: {
    up: number[];
    right: number[];
    down: number[];
    left: number[];
  };
};

const TILES: Tile[] = [
  {
    id: 0,
    color: '#ff0000',
    name: 'Horizontal',
    rules: {
      up: [0, 1, 3],
      right: [0, 2, 4],
      down: [0, 1, 3],
      left: [0, 2, 4]
    }
  },
  {
    id: 1,
    color: '#00ff00',
    name: 'Vertical',
    rules: {
      up: [0, 2, 4],
      right: [1, 3, 4],
      down: [0, 2, 4],
      left: [1, 3, 4]
    }
  },
  {
    id: 2,
    color: '#0000ff',
    name: 'Corner',
    rules: {
      up: [1, 3, 4],
      right: [0, 2, 4],
      down: [0, 2, 4],
      left: [1, 3, 4]
    }
  },
  {
    id: 3,
    color: '#ffff00',
    name: 'T-Shape',
    rules: {
      up: [0, 1, 3],
      right: [0, 2, 4],
      down: [0, 1, 3],
      left: [0, 2, 4]
    }
  },
  {
    id: 4,
    color: '#ff00ff',
    name: 'End',
    rules: {
      up: [1, 3, 4],
      right: [1, 3, 4],
      down: [1, 3, 4],
      left: [1, 3, 4]
    }
  }
];

function initializeGrid() {
  return Array(HEIGHT).fill(null).map(() => 
    Array(WIDTH).fill(null).map(() => ({
      possible: [...TILES.map(t => t.id)],
      collapsed: false
    }))
  );
}

export default function WFCPlayground() {
  const [grid, setGrid] = useState(initializeGrid());
  const [isRunning, setIsRunning] = useState(false);
  const [hasContradiction, setHasContradiction] = useState(false);

  const findLowestEntropyCell = (grid: any) => {
    let minEntropy = Infinity;
    const candidates = [];
    
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const cell = grid[y][x];
        if (!cell.collapsed && cell.possible.length < minEntropy) {
          minEntropy = cell.possible.length;
          candidates.length = 0;
          candidates.push({x, y});
        } else if (!cell.collapsed && cell.possible.length === minEntropy) {
          candidates.push({x, y});
        }
      }
    }
    
    return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
  };

interface GridCell {
    possible: number[];
    collapsed: boolean;
}

interface Direction {
    dx: number;
    dy: number;
    side: keyof Tile['rules'];
    opposite: keyof Tile['rules'];
}

const propagate = (grid: GridCell[][], x: number, y: number): void => {
    const stack: { x: number; y: number }[] = [{ x, y }];
    
    while (stack.length > 0) {
        const { x: currentX, y: currentY } = stack.pop()!;
        const currentCell = grid[currentY][currentX];
        
        // Check all four directions
        const directions: Direction[] = [
            { dx: -1, dy: 0, side: 'left', opposite: 'right' },
            { dx: 1, dy: 0, side: 'right', opposite: 'left' },
            { dx: 0, dy: -1, side: 'up', opposite: 'down' },
            { dx: 0, dy: 1, side: 'down', opposite: 'up' },
        ];
        
        for (const { dx, dy, side, opposite } of directions) {
            const nx = currentX + dx;
            const ny = currentY + dy;
            
            if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT) continue;
            
            const neighbor = grid[ny][nx];
            if (neighbor.collapsed) continue;
            
            const valid: number[] = [];
            for (const possibleId of neighbor.possible) {
                const tile = TILES.find(t => t.id === possibleId);
                if (currentCell.possible.some((id: number) => 
                    TILES.find((t: Tile) => t.id === id)?.rules[side]?.includes(possibleId)
                )) {
                    valid.push(possibleId);
                }
            }
            
            if (valid.length === 0) {
                setHasContradiction(true);
                return;
            }
            
            if (valid.length < neighbor.possible.length) {
                neighbor.possible = valid;
                stack.push({ x: nx, y: ny });
            }
        }
    }
};

  const wfcStep = () => {
    setHasContradiction(false);
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => 
        row.map(cell => ({...cell, possible: [...cell.possible]}))
      );
      
      const cellPos = findLowestEntropyCell(newGrid);
      if (!cellPos) return newGrid;
      
      const {x, y} = cellPos;
      const cell = newGrid[y][x];
      
      // Collapse the cell
      const selected = cell.possible[Math.floor(Math.random() * cell.possible.length)];
      cell.possible = [selected];
      cell.collapsed = true;
      
      // Propagate constraints
      propagate(newGrid, x, y);
      
      return newGrid;
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning && !hasContradiction) {
      interval = setInterval(wfcStep, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, hasContradiction]);

  return (
    <div className="container">
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={wfcStep} disabled={isRunning}>Step</button>
        <button onClick={() => {
          setGrid(initializeGrid());
          setHasContradiction(false);
        }}>Reset</button>
      </div>
      
      {hasContradiction && (
        <div className="error">Contradiction occurred! Reset to try again.</div>
      )}
      
      <div className="grid">
        {grid.map((row, y) => (
          <div key={y} className="row">
            {row.map((cell, x) => (
              <div
                key={x}
                className="cell"
                style={{
                  backgroundColor: cell.collapsed 
                    ? TILES.find(t => t.id === cell.possible[0])?.color 
                    : '#ffffff',
                  opacity: cell.collapsed ? 1 : 0.5
                }}
                title={cell.collapsed 
                  ? TILES.find(t => t.id === cell.possible[0])?.name 
                  : `Possible: ${cell.possible.length}`}
              />
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
        }
        
        .controls {
          margin-bottom: 20px;
          gap: 10px;
          display: flex;
        }
        
        button {
          padding: 8px 16px;
          cursor: pointer;
        }
        
        .error {
          color: red;
          margin-bottom: 10px;
        }
        
        .grid {
          display: inline-block;
          border: 1px solid #ccc;
        }
        
        .row {
          display: flex;
        }
        
        .cell {
          width: 30px;
          height: 30px;
          border: 1px solid #eee;
          transition: all 0.2s;
        }
        
        .cell:hover {
          transform: scale(1.1);
          z-index: 1;
          position: relative;
        }
      `}</style>
    </div>
  );
}