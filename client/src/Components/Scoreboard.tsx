import { useState } from "react";

function Scoreboard() {
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const addPoint = () => {
    setPlayerScore(playerScore + 1)
  }; 

  return (
    <div className = "scoreboard">
      <span className="score">{playerScore}</span> | <span className="score">{opponentScore}</span>
    </div>
  )
}

export default Scoreboard;