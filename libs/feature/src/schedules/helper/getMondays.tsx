export function getMondays() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysFromPreviousMonday = currentDay === 0 ? 6 : currentDay - 1; // Calculate days from previous Monday

  const nextMonday = new Date(
    currentDate.getTime() - daysFromPreviousMonday * 24 * 60 * 60 * 1000
  );

  const mondays = [nextMonday.setHours(0, 0, 0, 0)]; // Add current week's Monday

  for (let i = 0; i < 25; i++) {
    nextMonday.setDate(nextMonday.getDate() + 7); // Move to next Monday
    mondays.push(nextMonday.getTime()); // Add next Monday to the array
  }

  return mondays;
}
