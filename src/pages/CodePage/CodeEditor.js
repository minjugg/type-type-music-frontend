import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";

export default function App() {
  let code = [];

  const handleListenButton = (code) => {
    console.log(code);
  };

  return (
    <div>
      <CodeMirror
        value="// Type your code here to listen"
        options={{
          theme: "dracula",
          mode: "js",
        }}
        height="250px"
        onChange={(editor, viewUpdate) => {
          const value = editor.getValue();
          code = [...value];
        }}
      />
      <button onClick={() => handleListenButton(code)}>Listen</button>
    </div>
  );
}
