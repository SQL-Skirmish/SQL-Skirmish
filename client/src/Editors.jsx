import Editor from "@monaco-editor/react";
import { useRef } from "react";
import axios from "axios";

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

export default function Editors({ player, answer }) {
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
      }
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <section>
      <h2>Player {player}</h2>
      <h3>SQL</h3>
      <Editor
        height="38vh"
        width="350px"
        defaultLanguage="pgsql"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{ wordWrap: "on" }}
      />
      <button onClick={submitOperation}> Submit </button>
      <h3>Response</h3>
      <Editor
        height="38vh"
        width="350px"
        defaultLanguage="json"
        theme="vs-dark"
        onMount={handleResponseDidMount}
        options={{ readOnly: true }}
      />
    </section>
  );
}
