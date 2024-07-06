export function formatDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function revertFormattedDateTime(formattedString: string): string {
  const [datePart, timePart] = formattedString.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
