import { useRef } from "react";
import Score from "./Components/Score";
import Game from "./Components/Game";
import Rules from "./Components/Rules";
import "./App.css";

const App = () => {
  const playerScore = useRef(0);

  return (
    <div className="App">
      <Score playerScore={playerScore.current} />
      <Game playerScore={playerScore.current} />
      <button>Rules</button>
      <Rules />
    </div>
  );
};

export default App;
