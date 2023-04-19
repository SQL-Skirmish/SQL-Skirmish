import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

export default function ExpectedResponse({ answer }) {
  const responseRef = useRef(null);
  const [responseMounted, setResponseMounted] = useState(false);

  const handleResponseDidMount = (editor, monaco) => {
    responseRef.current = editor;
    setResponseMounted(true);
  };

  useEffect(() => {
    // console.log("ANSWER: ", answer);
    // console.log("responseRef", responseRef);
    if (responseMounted && responseRef.current) {
      responseRef.current.setValue(answer);
    }
  }, [answer, responseMounted]);

  return (
    <section>
      <h2 className="highlight-text">Expected Response</h2>
      <div className="monaco-wrapper">
        <Editor
          height="40vh"
          width="600px"
          defaultLanguage="json"
          theme="vs-dark"
          onMount={handleResponseDidMount}
          options={{ readOnly: true }}
        />
      </div>
    </section>
  );
}
