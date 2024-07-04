const formatDate = (timeStamp: string, includeTime = false) => {
  const date = new Date(timeStamp);
  const year = date.getUTCFullYear();
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const day = `0${date.getUTCDate()}`.slice(-2);
  let time = '';

  if (includeTime) {
    const hours = `0${date.getUTCHours()}`.slice(-2);
    const minutes = `0${date.getUTCMinutes()}`.slice(-2);
    time = ` ${hours}:${minutes}`;
  }

  return `${year}.${month}.${day}${time}`;
};

export default formatDate;
