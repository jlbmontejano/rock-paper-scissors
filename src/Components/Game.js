import React, { useState, useRef } from "react";
import Option from "./Option";
import "./Game.css";

const Game = ({ playerScore, setPlayerScore }) => {
  const [appState, setAppState] = useState("GameReady");
  const [playerChoice, setPlayerChoice] = useState();
  const [computerChoice, setComputerChoice] = useState("rock");
  const [gameMessage, setGameMessage] = useState();
  const options = ["rock", "paper", "scissors"];
  let myInterval = useRef(null);
  let counter = useRef(0);

  //Reset the game after every round
  const initialState = () => {
    setAppState("GameReady");
    setPlayerChoice();
    setComputerChoice("rock");
  };

  const gameLogic = () => {
    if (!computerChoice) {
      throw new Error();
    }
    if (playerChoice === computerChoice) {
      setGameMessage("It's a tie!");
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
      setGameMessage("You won!");
      setPlayerScore(playerScore + 1);
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
      setGameMessage("You won!");
      setPlayerScore(playerScore + 1);
    } else if (playerChoice === "paper" && computerChoice === "rock") {
      setGameMessage("You won!");
      setPlayerScore(playerScore + 1);
    } else {
      setGameMessage("You lost!");
      if (playerScore > 0) {
        setPlayerScore(playerScore - 1);
      }
    }
  };

  const toggleInterval = () => {
    if (!myInterval.current) {
      myInterval.current = setInterval(() => {
        if (counter.current === options.length) {
          counter.current = 0;
        }
        setComputerChoice(options[counter.current]);
        counter.current++;
      }, 100);
    } else {
      clearInterval(myInterval.current);
      myInterval.current = null;
    }
  };

  //"GameReady" = player's turn
  //"GameOn" = computer's turn
  //"GameOver" = winner is decided
  switch (appState) {
    case "GameReady":
      return (
        <div className="game">
          {options.map(option => (
            <Option
              option={option}
              setPlayerChoice={setPlayerChoice}
              setAppState={setAppState}
              toggleInterval={toggleInterval}
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
                setAppState("GameOver");
                toggleInterval();
                gameLogic();
              }}
            >
              Stop
            </button>
          </div>
          <img
            src={process.env.PUBLIC_URL + `images/${computerChoice}.svg`}
            alt={`${computerChoice}`}
            className={`option ${computerChoice}`}
          />
        </div>
      );
    case "GameOver":
      return (
        <div className="game-on">
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
