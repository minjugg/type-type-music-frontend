export const randomPosition = (dimension) => {
  if (dimension === "heightStandard") {
    return Math.round(Math.random() * window.innerHeight * 0.2);
  } else {
    return Math.round(Math.random() * window.innerWidth * 0.2);
  }
};
