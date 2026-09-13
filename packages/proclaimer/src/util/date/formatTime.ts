/**
 * Formats a 24-hour time string (HH:MM) into a 12-hour time string with AM/PM.
 * @param hhmm - Time string in HH:MM format
 * @returns Formatted time string (e.g. "7:30 PM")
 */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}
