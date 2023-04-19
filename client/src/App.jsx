import Editors from "./Editors";
import Prompt from "./Components/Prompt";
import { useState } from "react";
import ExpectedResponse from "./Components/ExpectedResponse";
import Timer from "./Components/Timer";

function App() {
  const [answer, setAnswer] = useState("");
  console.log("answer: ", answer);

  return (
    <main>
      <Editors player={1} answer={answer} />
      <section>
        <Timer></Timer>
        <Prompt setAnswer={setAnswer}></Prompt>
        <ExpectedResponse answer={answer}></ExpectedResponse>
      </section>
      <Editors player={2} answer={answer} />
    </main>
  );
}

export default App;
