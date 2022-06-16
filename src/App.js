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
      <div className="main-body" style={displayRules ? { opacity: "70%" } : {}}>
        <Score playerScore={playerScore} />
        <Game playerScore={playerScore} setPlayerScore={setPlayerScore} />
        <div className="rules-button">
          <button onClick={() => setDisplayRules(true)}>Rules</button>
        </div>
      </div>
      {displayRules === true && <Rules setDisplayRules={setDisplayRules} />}
    </div>
  );
};

export default App;
