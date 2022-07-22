import { atom, selector } from "recoil";
import { note } from "../constants/codeLetter";

export const musicState = atom({
  key: "musicState",
  default: `import React from "react";

  function invertCodeIntoMusic(word) {
    switch(word[0]) {
      case "a":
        console.log("chordA");
      default:
        break;
    }
  }`,
});

export const musicUrlState = atom({
  key: "urlState",
  default: "",
});

export const toneState = atom({
  key: "toneState",
  default: false,
});

export const recordingState = atom({
  key: "recordingState",
  default: null,
});

export const codeIndexState = atom({
  key: "codeIndexState",
  default: 0,
});

export const codeLetterState = selector({
  key: "codeLetterState",
  get: ({ get }) => {
    const code = get(musicState);
    const lettersOfCode = code
      .split(" ")
      .join(",")
      .split("\n")
      .join(",")
      .split("(")
      .join(",")
      .split(")")
      .join(",")
      .split("[")
      .join(",")
      .split("]")
      .join(",")
      .split("{")
      .join(",")
      .split("}")
      .join(",")
      .split(".")
      .join(",")
      .split("/")
      .join(",")
      .split("'")
      .join(",")
      .split(",")
      .filter((word) => {
        if (
          word === " " ||
          word.includes("\n") ||
          note[word[0]] === undefined
        ) {
          return false;
        }

        return true;
      });

    const sheet = {};

    lettersOfCode.map((letter, i) => {
      return (sheet[i] = letter);
    });

    return sheet;
  },
});

export const codeState = selector({
  key: "codeState",
  get: ({ get }) => {
    const code = get(musicState);
    const firstLettersOfCode = code
      .split(" ")
      .join(",")
      .split("\n")
      .join(",")
      .split("(")
      .join(",")
      .split(")")
      .join(",")
      .split("[")
      .join(",")
      .split("]")
      .join(",")
      .split("{")
      .join(",")
      .split("}")
      .join(",")
      .split(".")
      .join(",")
      .split("/")
      .join(",")
      .split("'")
      .join(",")
      .split(",")
      .filter((word) => {
        if (
          word === " " ||
          word.includes("\n") ||
          note[word[0]] === undefined
        ) {
          return false;
        }

        return true;
      })
      .map((letter) => {
        return letter[0];
      });

    return firstLettersOfCode;
  },
});

export const triggerState = atom({
  key: "triggerState",
  default: 0,
});
