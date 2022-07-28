const reduceNote = (array) => {
  const totalNoteLength = array?.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });

  return totalNoteLength;
};

export const calculateNoteLength = (array) => {
  const noteLengthArray = array.map((bar) => {
    return bar.length;
  });

  if (!noteLengthArray) {
    return 0;
  }

  return reduceNote(noteLengthArray);
};
