import "./ScoreBoard.css"; 
import React from "react";
import PropTypes from 'prop-types';

const ScoreBoard = ({score}) =>{
    return(
            <div className="score-board">
                Score: {score} 
            </div>
    )
}
export default ScoreBoard; 

ScoreBoard.propTypes = {
score : PropTypes.number,
}