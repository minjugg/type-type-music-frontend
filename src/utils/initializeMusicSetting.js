import slowDrumbeat from "../samples/drum/080_bpm.wav";
import normalDrumBeat from "../samples/drum/117_bpm.wav";
import fastDrumBeat from "../samples/drum/161_bpm.wav";

let drumbeat;
let bpm;

export const initializeMusicSetting = (totalCodeLength) => {
  if (totalCodeLength < 15) {
    drumbeat = slowDrumbeat;
    bpm = 80;
  } else if (totalCodeLength > 30) {
    drumbeat = fastDrumBeat;
    bpm = 161;
  } else {
    drumbeat = normalDrumBeat;
    bpm = 117;
  }

  return { drumbeat, bpm };
};
