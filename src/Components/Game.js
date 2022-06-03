import React, { useState, useEffect } from "react";
import "./Game.css";

const Game = ({ playerScore }) => {
  const [appState, setAppState] = useState("GameReady");
  const [playerChoice, setPlayerChoice] = useState();
  const [computerChoice, setComputerChoice] = useState();
  const [gameMessage, setGameMessage] = useState();
  const options = ["rock", "paper", "scissors"];
  let random = [Math.floor(Math.random() * options.length)];

  //Reset the game after every round
  const initialState = () => {
    setAppState("GameReady");
    setPlayerChoice();
    setComputerChoice();
  };

  useEffect(() => {
    gameLogic();
  }, [computerChoice]);

  const gameLogic = () => {
    if (playerChoice === computerChoice) {
      setGameMessage("It's a tie!");
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
      setGameMessage("You've won!");
      playerScore++;
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
      setGameMessage("You've won!");
      playerScore++;
    } else if (playerChoice === "paper" && computerChoice === "rock") {
      setGameMessage("You've won!");
      playerScore++;
    } else {
      setGameMessage("You've lost!");
      playerScore--;
    }
  };

  //"GameReady" = player's turn
  //"GameOn" = computer's turn
  //"GameOver" = winner is decided
  switch (appState) {
    case "GameReady":
      return (
        <div className="game-ready">
          {options.map(option => (
            <img
              src={process.env.PUBLIC_URL + `images/${option}.svg`}
              alt={`${option}`}
              key={`${option}`}
              className={`option ${option}`}
              onClick={() => {
                setPlayerChoice(`${option}`);
                setAppState("GameOn");
              }}
            />
          ))}
        </div>
      );
    case "GameOn":
      return (
        <div className="game-on">
          <img
            src={process.env.PUBLIC_URL + `images/${playerChoice}.svg`}
            alt={`${playerChoice}`}
            className={`option ${playerChoice}`}
          />
          <div>
            <button
              onClick={() => {
                random = [Math.floor(Math.random() * options.length)];
                setComputerChoice(options[random]);
                setAppState("GameOver");
              }}
            >
              Stop
            </button>
          </div>
          <span className={`option`} />
        </div>
      );
    case "GameOver":
      return (
        <div className="game-over">
          <img
            src={process.env.PUBLIC_URL + `images/${playerChoice}.svg`}
            alt={`${playerChoice}`}
            className={`option ${playerChoice}`}
          />
          <div>
            <h3>{`${gameMessage}`}</h3>
            <button
              onClick={() => {
                initialState();
              }}
            >
              Play Again
            </button>
          </div>
          <img
            src={process.env.PUBLIC_URL + `images/${computerChoice}.svg`}
            alt={`${computerChoice}`}
            className={`option ${computerChoice}`}
          />
        </div>
      );
    default:
      return;
  }
};

export default Game;
