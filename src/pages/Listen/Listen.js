import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Tone from "tone";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { musicState, musicUrlState } from "../../states/music";
import { tokenState, userState } from "../../states/user";
import axios from "axios";
import { note } from "../../constants/codeLetter";
import drum from "../../samples/drum/080_bpm.wav";
import A1 from "../../samples/bass/curiousbass.wav";

export default function Listen() {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenState);
  const currentUser = useRecoilValue(userState);
  const codeLetter = useRecoilValue(musicState);
  const setUrlMade = useSetRecoilState(musicUrlState);

  const melody = codeLetter.split("").map((key) => note[key]);

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

    synth.volume.value = -10;

    recorder.start();

    let noteIndex = 0;

    const drumbeat = new Tone.Player(drum).toDestination();
    const bassbeat = new Tone.Sampler({ A1 }).toDestination();

    drumbeat.volume.value = -6;
    bassbeat.volume.value = -10;

    Tone.loaded().then(() => {
      drumbeat.start();
    });

    const sequence = new Tone.Sequence(
      async (time, note) => {
        if (noteIndex === melody.length) {
          Tone.Transport.stop();
          sequence.stop();

          let stop = true;

          const endRecording = setInterval(async () => {
            if (stop) {
              stop = false;
              const recording = await recorder.stop();
              const url = URL.createObjectURL(recording);

              setUrlMade(url);

              const file = new File([recording], "blob", {
                type: "audio/mpeg",
              });

              const formData = new FormData();
              formData.append("audio", file);

              await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/${currentUser}/records`,
                formData,
                {
                  headers,
                }
              );
            }

            return clearInterval(endRecording);
          }, 500);

          if (currentUser) {
            return navigate(`/users/${currentUser}/code/play/tag`);
          }
        }

        synth.triggerAttackRelease(note, 0.5, time);
        bassbeat.triggerAttack("A1");
        noteIndex++;
      },
      melody,
      "8n"
    );

    Tone.Transport.start();
    Tone.Transport.bpm.value = 80;
    sequence.start();

    return () => {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      Tone.Transport.dispose();
    };
  };

  useEffect(() => {
    handleListenButton();
  }, []);

  return <div className="main-background">Playing code ...</div>;
}
