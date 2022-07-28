export const randomPosition = (dimension) => {
  if (dimension === "heightStandard") {
    return Math.round(Math.random() * window.innerHeight * 0.8);
  } else {
    return Math.round(Math.random() * window.innerWidth * 0.8);
  }
};
