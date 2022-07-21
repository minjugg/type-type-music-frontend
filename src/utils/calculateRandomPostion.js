export const randomPosition = (dimension) => {
  if (dimension === window.innerHeight) {
    return Math.round(Math.random() * window.innerHeight);
  } else {
    return Math.round(Math.random() * window.innerWidth);
  }
};
