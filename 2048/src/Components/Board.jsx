import React, { useEffect } from "react";
import "./Board.css";
import Tile from "./Tile";
import WinningScreen from "./WinningScreen";
import useGameLogic from "./useGameLogic.js"
import ScoreBoard from "./ScoreBoard.jsx";
 
export const Board = () => {
  const {tiles,open,result,handleMove, score} = useGameLogic(); 

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleMove]);

  // Add a random tile (either 2 or 4) to an empty spot in the grid
return (
  <div>
    <ScoreBoard score = {score}></ScoreBoard>
    <div className="game-container">
      <div className="game-board">
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              number={tile}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
      </div>
      <WinningScreen open={open} result={result}></WinningScreen>
    </div>
  </div>
);
};

export default Board;

