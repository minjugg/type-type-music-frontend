import { note } from "../constants/codeLetter";

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// let octave = randomNumber(2, 3);
let octave = 3;

export const randomArray = (letter) => {
  if (octave < 3) {
    octave += 1;
  } else if (octave > 3) {
    octave -= 1;
  } else {
    octave += randomNumber(-1, 1);
  }

  return new Array(randomNumber(1, 3)).fill().map(() => {
    return note[letter][randomNumber(0, 3)] + octave;
  });
};

// export const randomArray = (letter) => {
//   return new Array(randomNumber(1, 3)).fill().map(() => {
//     let word = note[letter][randomNumber(0, 2)];
//     if (note[letter][randomNumber(0, 2)].includes(2)) {
//       console.log(octave, note[letter][randomNumber(0, 2)](octave + 1));
//       return word.substr(0, word.length()) + (octave + 1);
//     } else {
//       return note[letter][randomNumber(0, 2)] + octave;
//     }
//   });
// };
