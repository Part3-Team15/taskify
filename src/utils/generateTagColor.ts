const generateTagColor = (): string => {
  const colors = ['pink', 'blue', 'green', 'orange'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export default generateTagColor;
