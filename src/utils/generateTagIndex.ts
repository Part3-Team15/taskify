const NUM_TAG_COLORS = 6;

// NOTE: 태그에 고유한 색상 부여하기 위해 태그 글자 아스키값 합을 이용해 색 배정 (합 % 색 개수)
const generateTagIndex = (tag: string) => {
  const asciiList = tag.split('').map((c) => c.charCodeAt(0));
  const sum = asciiList.reduce((a, b) => a + b, 0);
  return sum % NUM_TAG_COLORS;
};

export default generateTagIndex;
