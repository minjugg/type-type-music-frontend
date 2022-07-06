import React from "react";
import { useSetRecoilState } from "recoil";
import { musicState } from "../../states/music";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import * as Tone from "tone";

export default function App() {
  const setMusicCode = useSetRecoilState(musicState);

  function play(e) {
    const synth = new Tone.Synth({
      oscillator: {
        type: "sine",
      },
    }).toDestination();

    switch (e.key) {
      case "q":
        return synth.triggerAttackRelease("G2", "16n");
      case "w":
        return synth.triggerAttackRelease("A2", "16n");
      case "e":
        return synth.triggerAttackRelease("B2", "16n");
      case "r":
        return synth.triggerAttackRelease("C3", "16n");
      case "t":
        return synth.triggerAttackRelease("D3", "16n");
      case "y":
        return synth.triggerAttackRelease("E3", "16n");
      case "u":
        return synth.triggerAttackRelease("F3", "16n");
      case "i":
        return synth.triggerAttackRelease("G3", "16n");
      case "o":
        return synth.triggerAttackRelease("A3", "16n");
      case "p":
        return synth.triggerAttackRelease("B3", "16n");
      case "a":
        return synth.triggerAttackRelease("C4", "16n");
      case "s":
        return synth.triggerAttackRelease("D4", "16n");
      case "d":
        return synth.triggerAttackRelease("E4", "16n");
      case "f":
        return synth.triggerAttackRelease("F4", "16n");
      case "g":
        return synth.triggerAttackRelease("G4", "16n");
      case "h":
        return synth.triggerAttackRelease("A4", "16n");
      case "j":
        return synth.triggerAttackRelease("B4", "16n");
      case "k":
        return synth.triggerAttackRelease("C5", "16n");
      case "l":
        return synth.triggerAttackRelease("D5", "16n");
      case "z":
        return synth.triggerAttackRelease("E5", "16n");
      case "x":
        return synth.triggerAttackRelease("F5", "16n");
      case "c":
        return synth.triggerAttackRelease("G5", "16n");
      case "v":
        return synth.triggerAttackRelease("A5", "16n");
      case "b":
        return synth.triggerAttackRelease("B5", "16n");
      case "n":
        return synth.triggerAttackRelease("C6", "16n");
      case "m":
        return synth.triggerAttackRelease("D6", "16n");
      default:
        return;
    }
  }

  window.addEventListener("keydown", play);

  return (
    <div>
      <CodeMirror
        value="console.log('hello')"
        options={{
          theme: "dracula",
          mode: "js",
        }}
        height="250px"
        onChange={(editor, viewUpdate) => {
          const value = editor.getValue();

          setMusicCode([...value]);
        }}
      />
    </div>
  );
}
