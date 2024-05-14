export const getPreviousMonday = () => {
  const date = new Date();
  date.setDate(date.getDate() - ((date.getDay() + 7 - 1) % 7));

  date.setHours(0, 0, 0, 0);
  return date.getTime();
};
