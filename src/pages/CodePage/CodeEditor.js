import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import * as Tone from "tone";

export default function App() {
  let code = [];

  const handleListenButton = (code) => {
    console.log(code);
  };

  function play(e) {
    const synth = new Tone.Synth().toDestination();

    switch (e.key) {
      case "q":
        return synth.triggerAttackRelease("G2", "8n");
      case "w":
        return synth.triggerAttackRelease("A2", "8n");
      case "e":
        return synth.triggerAttackRelease("B2", "8n");
      case "r":
        return synth.triggerAttackRelease("C3", "8n");
      case "t":
        return synth.triggerAttackRelease("D3", "8n");
      case "y":
        return synth.triggerAttackRelease("E3", "8n");
      case "u":
        return synth.triggerAttackRelease("F3", "8n");
      case "i":
        return synth.triggerAttackRelease("G3", "8n");
      case "o":
        return synth.triggerAttackRelease("A3", "8n");
      case "p":
        return synth.triggerAttackRelease("B3", "8n");
      case "a":
        return synth.triggerAttackRelease("C4", "8n");
      case "s":
        return synth.triggerAttackRelease("D4", "8n");
      case "d":
        return synth.triggerAttackRelease("E4", "8n");
      case "f":
        return synth.triggerAttackRelease("F4", "8n");
      case "g":
        return synth.triggerAttackRelease("G4", "8n");
      case "h":
        return synth.triggerAttackRelease("A4", "8n");
      case "j":
        return synth.triggerAttackRelease("B4", "8n");
      case "k":
        return synth.triggerAttackRelease("C5", "8n");
      case "l":
        return synth.triggerAttackRelease("D5", "8n");
      case "z":
        return synth.triggerAttackRelease("E5", "8n");
      case "x":
        return synth.triggerAttackRelease("F5", "8n");
      case "c":
        return synth.triggerAttackRelease("G5", "8n");
      case "v":
        return synth.triggerAttackRelease("A5", "8n");
      case "b":
        return synth.triggerAttackRelease("B5", "8n");
      case "n":
        return synth.triggerAttackRelease("C6", "8n");
      case "m":
        return synth.triggerAttackRelease("D6", "8n");
      default:
        return;
    }
  }

  window.addEventListener("keydown", play);

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
