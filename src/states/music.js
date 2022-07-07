import { atom } from "recoil";

export const musicState = atom({
  key: "musicState",
  default: [],
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const musicURLState = atom({
  key: "urlState",
  default: "",
});

export const toneState = atom({
  key: "toneState",
  default: false,
});
