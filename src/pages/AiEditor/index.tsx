import React, { useEffect, useRef } from "react";
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";

function App() {
  //Define Ref
  const divRef = useRef(null);

  //Initialization AiEditor
  useEffect(() => {
    if (divRef.current) {
      const aiEditor = new AiEditor({
        element: divRef.current,
        placeholder: "Click to Input Content...",
        content:
          "AiEditor is an Open Source Rich Text Editor Designed for AI. ",
      });
      return () => {
        aiEditor.destroy();
      };
    }
  }, []);

  return (
    <>
      <div>
        <h1>AiEditor， an Open Source Rich Text Editor Designed for AI</h1>
      </div>
      <div ref={divRef} style={{ height: "600px" }} />
    </>
  );
}

export default App;
