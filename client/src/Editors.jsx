import Editor from "@monaco-editor/react";
import { useRef } from "react";
import axios from "axios";
import ryu from "./images/ryu.gif";
import dhalsim from "./images/dhalsim.gif";

function formatJSON(val = {}) {
  try {
    const res = JSON.parse(val);
    return JSON.stringify(res, null, 2);
  } catch {
    const errorJson = {
      error: `${val}`,
    };
    return JSON.stringify(errorJson, null, 2);
  }
}

export default function Editors({ player, answer, setWinner }) {
  const editorRef = useRef(null);
  const responseRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };
  const handleResponseDidMount = (editor, monaco) => {
    responseRef.current = editor;
  };

  const submitOperation = async () => {
    const operation = editorRef.current.getValue();
    try {
      const { data } = await axios.post("/api/operation", {
        operation: operation.replaceAll('"', "'"),
      });
      const response = JSON.stringify(data.response, null, 2);
      responseRef.current.setValue(response);
      if (response === answer) {
        console.log("WINNER");
        setWinner(player);
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <section className="editors-section">
      <h2 className="editors-section-username highlight-text-1">
        Player {player}
      </h2>
      <img
        className={`player-avatar player-${player}-avatar`}
        src={player === 1 ? ryu : dhalsim}
      ></img>
      <h3>SQL</h3>
      <div className="monaco-wrapper player-editor">
        <Editor
          height="30vh"
          width="350px"
          defaultLanguage="pgsql"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{ wordWrap: "on" }}
        />
        <button className="submit-button" onClick={submitOperation}>
          Submit!
        </button>
      </div>

      <h3>Response</h3>
      <div className="monaco-wrapper player-response">
        <Editor
          height="30vh"
          width="350px"
          defaultLanguage="json"
          theme="vs-dark"
          onMount={handleResponseDidMount}
          options={{ readOnly: true }}
        />
      </div>
    </section>
  );
}
