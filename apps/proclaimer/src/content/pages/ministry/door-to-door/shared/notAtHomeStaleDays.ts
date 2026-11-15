export const NOT_AT_HOME_STALE_DAY_CHOICES = [0, 1, 7, 14, 21, 28, 60, 90, 120] as const;

export function isValidStaleDays(value: number): boolean {
  return (NOT_AT_HOME_STALE_DAY_CHOICES as readonly number[]).includes(value);
}
