import React, { useRef, useReducer, useEffect } from "react";
import Option from "./Option";
import "./Game.css";

export const ACTIONS = {
  APP_STATE: {
    GAME_READY: "GameReady",
    GAME_ON: "GameOn",
    GAME_OVER: "GameOver",
  },
  COMPUTER_CHOICE: "computerChoice",
  GAME_MESSAGE: "setMessage",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.APP_STATE.GAME_READY:
      return {
        appState: "GameReady",
        playerChoice: "",
        computerChoice: "rock",
        gameMessage: "",
      };
    case ACTIONS.APP_STATE.GAME_ON:
      return {
        ...state,
        appState: "GameOn",
        playerChoice: action.payload.playerChoice,
      };
    case ACTIONS.APP_STATE.GAME_OVER:
      return {
        ...state,
        appState: "GameOver",
      };
    case ACTIONS.GAME_MESSAGE:
      return {
        ...state,
        gameMessage: action.payload.gameMessage,
      };
    case ACTIONS.COMPUTER_CHOICE:
      return {
        ...state,
        computerChoice: action.payload.computerChoice,
      };
    default:
      throw new Error();
  }
};

const Game = ({ playerScore, setPlayerScore }) => {
  const initialState = {
    appState: "GameReady",
    playerChoice: "",
    computerChoice: "rock",
    gameMessage: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const options = ["rock", "paper", "scissors"];
  let myInterval = useRef(null);
  let counter = useRef(0);

  const toggleInterval = () => {
    if (!myInterval.current) {
      myInterval.current = setInterval(() => {
        if (counter.current === options.length) {
          counter.current = 0;
        }
        dispatch({
          type: ACTIONS.COMPUTER_CHOICE,
          payload: { computerChoice: options[counter.current] },
        });
        counter.current++;
      }, 100);
    } else {
      clearInterval(myInterval.current);
      myInterval.current = null;
    }
  };

  const gameLogic = () => {
    if (!state.computerChoice) {
      throw new Error();
    }
    if (state.playerChoice === state.computerChoice) {
      dispatch({
        type: ACTIONS.GAME_MESSAGE,
        payload: { gameMessage: "It's a tie!" },
      });
    } else if (
      state.playerChoice === "rock" &&
      state.computerChoice === "scissors"
    ) {
      dispatch({
        type: ACTIONS.GAME_MESSAGE,
        payload: { gameMessage: "You won" },
      });
      setPlayerScore(playerScore + 1);
    } else if (
      state.playerChoice === "scissors" &&
      state.computerChoice === "paper"
    ) {
      dispatch({
        type: ACTIONS.GAME_MESSAGE,
        payload: { gameMessage: "You won" },
      });
      setPlayerScore(playerScore + 1);
    } else if (
      state.playerChoice === "paper" &&
      state.computerChoice === "rock"
    ) {
      dispatch({
        type: ACTIONS.GAME_MESSAGE,
        payload: { gameMessage: "You won" },
      });
      setPlayerScore(playerScore + 1);
    } else {
      dispatch({
        type: ACTIONS.GAME_MESSAGE,
        payload: { gameMessage: "You lost" },
      });
      if (playerScore > 0) {
        setPlayerScore(playerScore - 1);
      }
    }
  };

  const GameReady = () => {
    return (
      <div className="game">
        {options.map(option => {
          return (
            <Option
              option={option}
              dispatch={dispatch}
              choice={{ playerChoice: option }}
              toggleInterval={toggleInterval}
            />
          );
        })}
      </div>
    );
  };

  const GameOn = () => {
    return (
      <div className="game-on">
        <Option option={state.playerChoice} dispatch={dispatch} />
        <div>
          <button
            onClick={() => {
              gameLogic();
              toggleInterval();
              dispatch({ type: ACTIONS.APP_STATE.GAME_OVER });
            }}
          >
            Stop
          </button>
        </div>
        <Option option={state.computerChoice} />
      </div>
    );
  };

  const GameOver = () => {
    return (
      <div className="game-on">
        <Option option={state.playerChoice} dispatch={dispatch} />
        <div>
          <h3>{`${state.gameMessage}`}</h3>
          <button
            onClick={() => {
              dispatch({ type: ACTIONS.APP_STATE.GAME_READY });
            }}
          >
            Play Again
          </button>
        </div>
        <Option option={state.computerChoice} dispatch={dispatch} />
      </div>
    );
  };

  switch (state.appState) {
    case "GameReady":
      return GameReady();
    case "GameOn":
      return GameOn();
    case "GameOver":
      return GameOver();
    default:
      throw new Error();
  }
};

export default Game;
