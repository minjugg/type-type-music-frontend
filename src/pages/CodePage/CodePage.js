import React from "react";
import { useNavigate } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import * as Tone from "tone";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { musicState, musicURLState, tokenState } from "../../states/music";
import axios from "axios";
import styled from "styled-components";

export default function CodePage() {
  const codeLetter = useRecoilValue(musicState);
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const setUrl = useSetRecoilState(musicURLState);

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

  const newNote = codeLetter.map((key) => note[key]);

  const handleListenButton = (e) => {
    const recorder = new Tone.Recorder();
    const synth = new Tone.Synth({
      oscillator: {
        type: "triangle",
      },
    }).chain(Tone.Destination, recorder);

    recorder.start();

    let noteIndex = 0;

    const sequence = new Tone.Sequence(
      (time, note) => {
        if (noteIndex === newNote.length) {
          const recordingStop = setInterval(async () => {
            const recording = await recorder.stop();
            const url = URL.createObjectURL(recording);
            setUrl(url);

            const result = await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/upload`,
              { data: url },
              {
                headers: {
                  "Content-Type": "application/json",
                  charset: "utf-8",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const anchor = document.createElement("a");
            anchor.download = "recording.webm";
            anchor.href = url;
            anchor.click();
            return clearInterval(recordingStop);
          }, 500);

          Tone.Transport.stop();
          sequence.stop();
          return;
        }

        synth.triggerAttackRelease(note, 0.5, time);
        noteIndex++;
      },
      newNote,
      "16n"
    );

    Tone.Transport.start();
    sequence.start();
    navigate("/code/play");
  };

  return (
    <div className="main-background">
      <CodeWrapper>
        <CodeEditor />
        <button onClick={handleListenButton}>Listen</button>
      </CodeWrapper>
    </div>
  );
}

const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  button {
    justify-content: center;
    text-align: center;
    font-size: 40px;
  }
`;
