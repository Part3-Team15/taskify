const formatDate = (timeStamp: string, includeTime = false, isUTC = false) => {
  const date = new Date(timeStamp);
  const year = isUTC ? date.getUTCFullYear() : date.getFullYear();
  const month = `0${isUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1}`.slice(-2);
  const day = `0${isUTC ? date.getUTCDate() : date.getDate()}`.slice(-2);
  let time = '';

  if (includeTime) {
    const hours = `0${isUTC ? date.getUTCHours() : date.getHours()}`.slice(-2);
    const minutes = `0${isUTC ? date.getUTCMinutes() : date.getMinutes()}`.slice(-2);
    time = ` ${hours}:${minutes}`;
  }

  return `${year}.${month}.${day}${time}`;
};

export default formatDate;
