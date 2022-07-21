import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  triggerState,
  musicUrlState,
  recordingState,
} from "../../states/music";

import * as Tone from "tone";
import { calculateNoteLength } from "../calculateNoteLength";
import { codeIndexState } from "../../states/music";
import { initializeMusicSetting } from "../initializeMusicSetting";

export const usePlayMusic = (notes) => {
  const setUrl = useSetRecoilState(musicUrlState);
  const setRecording = useSetRecoilState(recordingState);
  const setLettersIndex = useSetRecoilState(codeIndexState);
  const trigger = useRecoilValue(triggerState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recorder = new Tone.Recorder();

    const synth = new Tone.PolySynth(Tone.Synth).chain(
      Tone.Destination,
      recorder
    );

    recorder.start();

    const { drumbeat, bpm } = initializeMusicSetting(notes.length);

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();

    let noteIndex = 0;

    const player = new Tone.Player({
      url: drumbeat,
      autostart: true,
      loop: true,
      volume: -15,
    }).toDestination();

    const noteLength = calculateNoteLength(notes);

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
            const url = URL.createObjectURL(recording);
            setUrl(url);
            setRecording(recording);

            player.stop();
            return clearInterval(endRecording);
          }, 1000);

          sequence.stop();
          Tone.Transport.stop();
          setLoading(false);
        } else {
          if (indexOfFirstLetters.includes(noteIndex)) {
            setLettersIndex((index) => index + 1);
          }
          synth.triggerAttackRelease(note, 0.1);
          noteIndex++;
        }
      },
      notes,
      "4n"
    );

    sequence.start();
  }, [trigger]);

  return { loading };
};
