import { wouldOverlap } from "./pioneer-period.ts";
import type { RegularPioneer } from "../schemas/regular-pioneer.ts";

interface PeriodInput {
  publisher_id: string;
  start_month: string;
  end_month: string | null;
}

export function validatePeriodInput(
  input: PeriodInput,
  periods: RegularPioneer[],
  exclude_id?: string,
): string | null {
  if (!input.publisher_id) return "Select a publisher.";
  if (!input.start_month) return "Select a start month.";
  if (input.end_month && input.end_month < input.start_month) {
    return "End month must be on or after the start month.";
  }
  const others = periods.filter(
    (p) => p.publisher_id === input.publisher_id && p.id !== exclude_id,
  );
  if (wouldOverlap(others, input)) {
    return "This period overlaps an existing period for that publisher.";
  }
  return null;
}
