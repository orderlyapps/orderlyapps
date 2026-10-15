import type { Publisher } from "@amodeo/proclaimer/feature/publisher";

/** Active publisher types that are expected to turn in a monthly report. */
export const REPORTABLE_TYPES: ReadonlySet<Publisher["type"]> = new Set([
  "publisher",
  "regular_pioneer",
  "special_pioneer",
  "continuous_auxiliary",
]);

export const PIONEER_TYPES: ReadonlySet<Publisher["type"]> = new Set([
  "regular_pioneer",
  "special_pioneer",
]);
