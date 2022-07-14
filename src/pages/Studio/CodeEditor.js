import React from "react";
import { useRecoilState } from "recoil";
import { musicState } from "../../states/music";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";

export default function CodeEditor() {
  const [code, setMusicCode] = useRecoilState(musicState);

  return (
    <CodeMirror
      value={code}
      options={{
        theme: "dracula",
        mode: "js",
      }}
      height="400px"
      width="800px"
      onChange={(editor, viewUpdate) => {
        const value = editor.getValue();

        setMusicCode(value);
      }}
    />
  );
}
