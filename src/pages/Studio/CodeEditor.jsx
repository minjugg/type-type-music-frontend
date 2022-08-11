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
      options={{
        theme: "dracula",
        mode: "js",
      }}
      value={code}
      height="20rem"
      width="40rem"
      onChange={handleCode}
      data-testid="code-editor"
    />
  );
}
