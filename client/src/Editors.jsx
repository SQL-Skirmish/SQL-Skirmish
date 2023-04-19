import Editor from "@monaco-editor/react";
import { useRef } from "react";
import axios from "axios";

export default function Editors({ player }) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const submitOperation = async () => {
    console.log(editorRef.current.getValue());
    const operation = editorRef.current.getValue();
    try {
      const response = await axios.post("/api/operation", { operation });
      console.log(response);
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
      />
      <button onClick={submitOperation}> Submit </button>
      <h3>Response</h3>
      <Editor
        height="38vh"
        width="350px"
        defaultLanguage="json"
        theme="vs-dark"
      />
    </section>
  );
}
