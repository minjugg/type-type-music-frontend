import drumbeatVersion1 from "../samples/drum/080_bpm_ver1.wav";
import drumbeatVersion2 from "../samples/drum/080_bpm_ver2.wav";

let drumbeat;

export const initializeMusicSetting = (totalCodeLength) => {
  if (totalCodeLength < 30) {
    drumbeat = drumbeatVersion1;
  } else {
    drumbeat = drumbeatVersion2;
  }

  return { drumbeat };
};
