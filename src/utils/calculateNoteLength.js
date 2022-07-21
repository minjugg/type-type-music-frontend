let length = 0;

export const calculateNoteLength = (array) => {
  for (let i in array) {
    if (Array.isArray(array[i])) {
      calculateNoteLength(array[i]);
    } else {
      length++;
    }
  }

  return length;
};
