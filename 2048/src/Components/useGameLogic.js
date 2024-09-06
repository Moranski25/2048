import { useState,useEffect, useCallback } from "react";

const GRID_SIZE = 4; // 4x4 grid

const useGameLogic = () => {
    const createEmptyGrid = (size) => {
        return Array.from({ length: size }, () => Array(size).fill(null));
      };

      useEffect(() => {
        initializeBoard();
      }, []);
    
      const initializeBoard = () => {
        setTiles((prevTiles) => {
          let newGrid = addRandomTile(prevTiles);
          newGrid = addRandomTile(newGrid);
          return newGrid;
        });
      };

      const [tiles, setTiles] = useState(createEmptyGrid(GRID_SIZE)); //used to keep track of tiles
      const [open, setOpen] = useState(false);
      const [result, setResult] = useState(false); 
      const [score, setScore] = useState(0); 

      const hasLost = (grid) => {
        // Check for any empty spaces
        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col] === null) {
              console.log("Not empty"); 
              return false; 
            }
          }
        }
        // Check for any possible merges horizontally
        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = 0; col < GRID_SIZE - 1; col++) {
            if (grid[row][col] === grid[row][col + 1]) {
              console.log("Possible merge horizontally"); 
              return false; 
            }
          }
        }
        // Check for any possible merges vertically
        for (let col = 0; col < GRID_SIZE; col++) {
          for (let row = 0; row < GRID_SIZE - 1; row++) {
            if (grid[row][col] === grid[row + 1][col]) {
              console.log("Possible merge vertically"); 
              return false; 
            }
          }
        }
        // If no empty spaces or possible merges, the player has lost
        return true;
      };
      const addRandomTile = (grid) => {
        const emptyTiles = [];
        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col] === null) {
              emptyTiles.push({ row, col });
            }
          }
        }
    
        if (emptyTiles.length === 0){
          return grid;
        }
    
        const randomIndex = Math.floor(Math.random() * emptyTiles.length);
        const { row, col } = emptyTiles[randomIndex];
        const newGrid = [...grid];
        newGrid[row][col] = Math.random() < 0.8 ? 2 : 4;
        if(hasLost(newGrid)){
          console.log("In has lost"); 
          setOpen(true);
          setResult(false);
        }
        return newGrid;
    };
    const shiftTiles = (direction, grid) => {
      const newGrid = createEmptyGrid(GRID_SIZE);
    
      switch (direction) {
        case "left":
          for (let row = 0; row < GRID_SIZE; row++) {
            let newRow = shiftRow(grid[row]);
            newGrid[row] = newRow;
          }
          break;
    
        case "right":
          for (let row = 0; row < GRID_SIZE; row++) {
            let reversedRow = [...grid[row]].reverse();
            let newRow = shiftRow(reversedRow).reverse();
            newGrid[row] = newRow;
          }
          break;
    
        case "up":
          for (let col = 0; col < GRID_SIZE; col++) {
            const column = grid.map((row) => row[col]);
            const newColumn = shiftRow(column);
            newColumn.forEach((tile, rowIndex) => {
              newGrid[rowIndex][col] = tile;
            });
          }
          break;
    
        case "down":
          for (let col = 0; col < GRID_SIZE; col++) {
            const reversedColumn = grid.map((row) => row[col]).reverse();
            const newColumn = shiftRow(reversedColumn).reverse();
            newColumn.forEach((tile, rowIndex) => {
              newGrid[rowIndex][col] = tile;
            });
          }
          break;
    
        default:
          break;
      }
    
      return newGrid;
    };
    
    const handleMove = useCallback( (direction) => {
      setTiles((prevTiles) => {
        const newTiles = shiftTiles(direction, prevTiles);
        if (JSON.stringify(newTiles) !== JSON.stringify(prevTiles)) {
          // Only add a random tile if the board changed
          return addRandomTile(newTiles);
        }
        return prevTiles;
      });
    },[shiftTiles,addRandomTile]);
    
   
    
    const shiftRow = (row) => {
      const filteredRow = row.filter((tile) => tile !== null); //remove all tiles with null values. 
      const newRow = Array(row.length).fill(null);
    
      let targetIndex = 0;
      for (let i = 0; i < filteredRow.length; i++) {
        if (i < filteredRow.length - 1 && filteredRow[i] === filteredRow[i + 1]) { //Check if tiles should be merged
          newRow[targetIndex] = filteredRow[i] * 2; // Merge tiles
          setScore(score + newRow[targetIndex]);
          if(newRow[targetIndex]===2048){
            setOpen(true);
            setResult(true);
          }
          i++; // Skip next tile since it's merged
        } else {
          newRow[targetIndex] = filteredRow[i];
        }
        targetIndex++;
      }
    
      return newRow;
    };
    return {
        tiles,
        open,
        result,
        handleMove,
        score,
      }; 
}

export default useGameLogic; 