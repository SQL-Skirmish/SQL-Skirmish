import axios from "axios";
import { useEffect, useState } from "react";

function Prompt({ setAnswer }) {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const { data } = await axios.get("/api/prompt/one");
        setPrompt(data.prompt);
        console.log("answer operation: ", data.answer);
        const { data: opData } = await axios.post("/api/operation", {
          operation: data.answer.replaceAll('"', "'"),
        });
        setAnswer(JSON.stringify(opData.response, null, 2));
      } catch (e) {
        console.log("error: ", e);
      }
    };
    fetchPrompt();
  }, []);

  return (
    <div className="prompt">
      <h2 className="highlight-text">Round 1!</h2>
      <h3 className="prompt-text">{prompt}</h3>
    </div>
  );
}
export default Prompt;
