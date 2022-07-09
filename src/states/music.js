import { atom } from "recoil";

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
