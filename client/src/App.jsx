import Editors from "./Editors";
import Prompt from "./Components/Prompt";
import { useEffect, useState } from "react";
import ExpectedResponse from "./Components/ExpectedResponse";
import Timer from "./Components/Timer";
import ConfettiExplosion from "react-confetti-explosion";

function App() {
  const [answer, setAnswer] = useState("");
  const [winner, setWinner] = useState(null);
  console.log("answer: ", answer);

  useEffect(() => {
    console.log("winner is: ", winner);
  }, [winner]);

  return (
    <main>
      {winner && (
        <>
          <ConfettiExplosion
            particleCount={400}
            duration={8000}
            force={0.8}
            width={"4000"}
            particleSize={50}
          />
          <div className="winner-modal">Player {winner} wins!</div>
        </>
      )}

      <Editors setWinner={setWinner} player={1} answer={answer} />
      <section className="middle-section">
        <Timer></Timer>
        <Prompt setAnswer={setAnswer}></Prompt>
        <ExpectedResponse answer={answer}></ExpectedResponse>
      </section>
      <Editors setWinner={setWinner} player={2} answer={answer} />
    </main>
  );
}

export default App;
