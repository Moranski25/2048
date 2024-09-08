import "./Tile.css";
import React from "react";
import PropTypes from 'prop-types';

const Tile = ({ number, row, col }) => {
  const tileClassName = number ? `tile tile-${number}` : "tile empty-tile";
  
  const tileStyle = {
    gridRow: row + 1, // CSS grid is 1-based
    gridColumn: col + 1,
  };

  return (
    <div className={tileClassName} style={tileStyle}>
      {number}
    </div>
  );
};

Tile.propTypes={
  number:PropTypes.number,
  row:PropTypes.number, 
  col:PropTypes.number,
}
export default Tile;
