import { useState } from "react";
import Score from "./Components/Score";
import Game from "./Components/Game";
import Rules from "./Components/Rules";
import "./App.css";

const App = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [displayRules, setDisplayRules] = useState(false);

  return (
    <div className="App">
      <div
        className="main-body"
        style={!displayRules ? {} : { opacity: "70%" }}
      >
        <Score playerScore={playerScore} />
        <Game playerScore={playerScore} setPlayerScore={setPlayerScore} />
        <button
          onClick={() => {
            setDisplayRules(true);
          }}
        >
          Rules
        </button>
      </div>
      {displayRules === true && <Rules />}
    </div>
  );
};

export default App;
