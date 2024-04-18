export function timeToNow(timestamp: number): string {
  const now = Date.now();
  const timeDifference = timestamp > now ? timestamp - now : now - timestamp;

  // Define the time units and their thresholds in milliseconds
  const timeUnits: { unit: string; threshold: number }[] = [
    { unit: 'year', threshold: 365 * 24 * 60 * 60 * 1000 },
    { unit: 'month', threshold: 30 * 24 * 60 * 60 * 1000 },
    { unit: 'day', threshold: 24 * 60 * 60 * 1000 },
    { unit: 'hour', threshold: 60 * 60 * 1000 },
    { unit: 'minute', threshold: 60 * 1000 },
    { unit: 'second', threshold: 1000 },
  ];

  for (const { unit, threshold } of timeUnits) {
    if (timeDifference >= threshold) {
      const quantity =
        Math.floor(timeDifference / threshold) * (timestamp > now ? -1 : 1);
      const rtf = new Intl.RelativeTimeFormat('en', {
        style: 'short',
        numeric: 'auto',
      });

      return rtf.format(-quantity, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return 'Just now'; // If the time difference is less than a second
}
