const NUM_TAG_COLORS = 16;

const generateTagIndex = (tag: string) => {
  const asciiList = tag.split('').map((c) => c.charCodeAt(0));
  const sum = asciiList.reduce((a, b) => a + b, 0);
  return sum % NUM_TAG_COLORS;
};

export default generateTagIndex;
