const formatDate = (timeStamp: string, includeTime = false) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  let time = '';

  if (includeTime) {
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    time = ` ${hours}:${minutes}`;
  }

  return `${year}.${month}.${day}${time}`;
};

export default formatDate;
