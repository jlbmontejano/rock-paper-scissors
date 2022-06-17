import React from "react";
import "./Option.css";
import { ACTIONS } from "./Game";

const Option = ({
  option,
  dispatch = () => {},
  choice = null,
  toggleInterval = () => {},
}) => {
  return (
    <button
      className={`option ${option}`}
      onClick={() => {
        toggleInterval();
        dispatch({
          type: ACTIONS.APP_STATE.GAME_ON,
          payload: { ...choice },
        });
      }}
      disabled={!choice}
    >
      <img
        src={process.env.PUBLIC_URL + `images/${option}.svg`}
        alt={`${option}`}
        className={` ${option}`}
      />
    </button>
  );
};

export default Option;
