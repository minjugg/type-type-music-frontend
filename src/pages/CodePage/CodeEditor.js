import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import * as Tone from "tone";

export default function App() {
  let code = [];

  const synth = new Tone.Synth().toDestination();

  const note = {
    q: "G2",
    w: "A2",
    e: "B2",
    r: "C3",
    t: "D3",
    y: "E3",
    u: "F3",
    i: "G3",
    o: "A3",
    p: "B3",
    a: "C4",
    s: "D4",
    d: "E4",
    f: "F4",
    g: "G4",
    h: "A4",
    j: "B4",
    k: "C5",
    l: "D5",
    z: "E5",
    x: "F5",
    c: "G5",
    v: "A5",
    b: "B5",
    n: "C6",
    m: "D6",
  };

  let loopBeat;

  const handleListenButton = (code) => {
    let i = 0;

    const synth = new Tone.Synth().toDestination();

    function song(time) {
      if (i === code.length) return;

      if (note[code[i]]) {
        synth.triggerAttackRelease(note[code[i]], "16n", time);
      }

      i++;
    }

    loopBeat = new Tone.Loop(song, "16n");
    Tone.Transport.start();
    loopBeat.start(0);
  };

  function play(e) {
    const synth = new Tone.Synth().toDestination();

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
          code = [...value];
        }}
      />
      <button onClick={() => handleListenButton(code)}>Listen</button>
    </div>
  );
}
