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
  const setUrlMade = useSetRecoilState(musicURLState);

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

  const melody = codeLetter.map((key) => note[key]);

  const headers = {
    "Content-Type": "multipart/form-data",
    charset: "utf-8",
    Authorization: `Bearer ${token}`,
  };

  const handleListenButton = async () => {
    const recorder = new Tone.Recorder();
    const synth = new Tone.Synth({
      oscillator: {
        type: "sine",
      },
    }).chain(Tone.Destination, recorder);

    recorder.start();

    let noteIndex = 0;

    const sequence = new Tone.Sequence(
      async function (time, note) {
        if (noteIndex === melody.length) {
          Tone.Transport.stop();
          sequence.stop();

          let stop = true;

          const endRecord = setInterval(async () => {
            if (stop) {
              stop = false;
              const recording = await recorder.stop();
              const url = URL.createObjectURL(recording);
              const file = new File([recording], "blob", {
                type: "audio/mpeg",
              });

              setUrlMade(url);

              const formData = new FormData();
              formData.append("audio", file);

              await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/upload`,
                formData,
                {
                  headers,
                }
              );
            }

            return clearInterval(endRecord);
          }, 500);

          return navigate("/code/play");
        }

        synth.triggerAttackRelease(note, 0.5, time);
        noteIndex++;
      },
      melody,
      "8n"
    );

    Tone.Transport.start();
    sequence.start();

    return () => {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      Tone.Transport.dispose();
    };
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
