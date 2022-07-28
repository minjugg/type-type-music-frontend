import { note } from "../constants/codeLetter";

const shuffleRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let octave = 4;

export const createRandomArray = (letter) => {
  if (octave < 4) {
    octave += 1;
  } else if (octave > 4) {
    octave -= 1;
  } else {
    octave += shuffleRange(-1, 1);
  }

  return new Array(shuffleRange(1, 3)).fill().map(() => {
    return note[letter][shuffleRange(0, 2)] + octave;
  });
};
