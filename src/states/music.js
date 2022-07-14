import { atom, selector } from "recoil";
import { note } from "../constants/codeLetter";

export const musicState = atom({
  key: "musicState",
  default: "sample code",
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
      .split("{")
      .join(",")
      .split("}")
      .join(",")
      .split(".")
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
