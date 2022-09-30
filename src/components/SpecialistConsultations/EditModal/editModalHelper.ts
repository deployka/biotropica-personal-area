function addTomeToDate(date: Date, time: string) {
  date.setHours(+time.slice(0, 2));
  date.setMinutes(+time.slice(3));

  return date;
}
