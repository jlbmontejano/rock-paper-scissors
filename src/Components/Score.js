import React from "react";
import "./Score.css";

const Score = ({ playerScore }) => {
  return (
    <div className="header-box">
      <div>
        <h3>ROCK</h3>
        <h3>PAPER</h3>
        <h3>SCISSORS</h3>
      </div>
      <div className="score-box">
        <h5>SCORE</h5>
        <h1>{playerScore}</h1>
      </div>
    </div>
  );
};

export default Score;
