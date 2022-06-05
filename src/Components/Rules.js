import React from "react";
import "./Rules.css";

const Rules = () => {
  return (
    <div className="rules-box">
      <div>
        <h1>RULES</h1>
        <img
          src={process.env.PUBLIC_URL + `images/icon-close.svg`}
          alt="close"
        />
      </div>
      <div>
        <img
          src={process.env.PUBLIC_URL + `images/image-rules.svg`}
          alt="rules"
          className="image-rules"
        />
      </div>
    </div>
  );
};

export default Rules;
