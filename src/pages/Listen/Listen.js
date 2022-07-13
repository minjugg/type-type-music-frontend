import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { codeState, musicUrlState, recordingState } from "../../states/music";
import { userState } from "../../states/user";

import * as Tone from "tone";
import drumbeat from "../../samples/drum/080_bpm.wav";
import { randomArray } from "../../utils/octave";

export default function Listen() {
  const currentUser = useRecoilValue(userState);
  const setUrl = useSetRecoilState(musicUrlState);
  const setRecording = useSetRecoilState(recordingState);
  const firstLettersOfCode = useRecoilValue(codeState);
  const navigate = useNavigate();

  const finalRandomArray = firstLettersOfCode.map((letter) => {
    return randomArray(letter);
  });

  useEffect(() => {
    (async () => {
      const recorder = new Tone.Recorder();

      const synth = new Tone.PolySynth(Tone.Synth).chain(
        Tone.Destination,
        recorder
      );

      recorder.start();

      let noteIndex = 0;

      const player = new Tone.Player({
        url: drumbeat,
        autostart: true,
        loop: true,
        volume: -15,
      }).toDestination();

      const allLength = finalRandomArray.map((arr) => {
        return arr.length;
      });

      let sum = 0;

      for (let i = 0; i < allLength.length; i++) {
        sum += allLength[i];
      }

      const sequence = new Tone.Sequence(
        async (time, note) => {
          if (noteIndex === sum) {
            Tone.Transport.stop();
            sequence.stop();

            let stop = true;
            const endRecording = setInterval(async () => {
              if (stop) {
                stop = false;

                const recording = await recorder.stop();
                const url = URL.createObjectURL(recording);
                setUrl(url);
                setRecording(recording);

                if (currentUser) {
                  Tone.Transport.cancel();
                  Tone.Transport.stop();
                  Tone.Transport.dispose();
                  player.stop();

                  return navigate(`/users/${currentUser}/code/play/tag`);
                }
              }

              return clearInterval(endRecording);
            }, 500);
          }
          synth.triggerAttackRelease(note, 0.1, time);
          noteIndex++;
        },
        finalRandomArray,
        "4n"
      );

      sequence.start();
    })();

    return () => {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      Tone.Transport.dispose();
    };
  }, []);

  Tone.Transport.bpm.value = 80;
  Tone.Transport.start();

  return (
    <div className="main-background">
      <div>Playing Code...</div>
    </div>
  );
}
