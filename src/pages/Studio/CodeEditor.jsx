import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { musicState } from "../../states/music";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";

export default function CodeEditor() {
  const [code, setCode] = useRecoilState(musicState);

  const handleCode = useCallback((editor, viewUpdate) => {
    const value = editor.getValue();

    setCode(value);
  }, []);

  return (
    <CodeMirror
      value={code}
      options={{
        theme: "dracula",
        mode: "js",
      }}
      height="400px"
      width="700px"
      onChange={handleCode}
    />
  );
}
