import React from "react";
import "./Option.css";

const Option = ({ option, setPlayerChoice, setAppState, toggleInterval }) => {
  return (
    <div className={`${option}`}>
      <img
        src={process.env.PUBLIC_URL + `images/${option}.svg`}
        alt={`${option}`}
        key={`${option}`}
        className={`option ${option}`}
        onClick={() => {
          setPlayerChoice(`${option}`);
          setAppState("GameOn");
          toggleInterval();
        }}
      />
    </div>
  );
};

export default Option;
