import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { musicUrlState, recordingState } from "../../states/music";

import * as Tone from "tone";
import { calculateNoteLength } from "../calculateNoteLength";
import { codeIndexState } from "../../states/music";
import { initializeMusicSetting } from "../initializeMusicSetting";

export const usePlayMusic = (notes) => {
  const setRecording = useSetRecoilState(recordingState);
  const setLettersIndex = useSetRecoilState(codeIndexState);
  const setUrl = useSetRecoilState(musicUrlState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const noteLength = calculateNoteLength(notes);

  useEffect(() => {
    const recorder = new Tone.Recorder();

    const synth = new Tone.PolySynth(Tone.Synth).chain(
      Tone.Destination,
      recorder
    );

    recorder.start();

    const { drumbeat } = initializeMusicSetting(notes.length);

    Tone.Transport.volume = -30;
    Tone.Transport.bpm.value = 80;
    Tone.Transport.start();

    let noteIndex = 0;

    const player = new Tone.Player({
      url: drumbeat,
      autostart: true,
      loop: true,
      volume: -15,
    }).toDestination();

    let index = 0;

    const indexOfFirstLetters = notes.map((word, i) => {
      if (i === notes.length - 1) return null;

      index += word.length;

      return index;
    });

    const sequence = new Tone.Sequence(
      async (time, note) => {
        if (noteIndex >= noteLength) {
          const endRecording = setInterval(async () => {
            const recording = await recorder.stop();
            setRecording(recording);

            const url = URL.createObjectURL(recording);
            setUrl(url);

            return clearInterval(endRecording);
          }, 1000);

          player.stop();
          sequence.stop();
          Tone.Transport.stop();
          setLoading(false);
        } else {
          if (indexOfFirstLetters.includes(noteIndex)) {
            setLettersIndex((index) => index + 1);
          }
          synth.triggerAttackRelease(note, 0.3, time);
          noteIndex++;
        }
      },
      notes,
      "4n"
    );

    sequence.start();
  }, []);

  if (noteLength === 0) {
    setError(true);
  }

  return { loading };
};
