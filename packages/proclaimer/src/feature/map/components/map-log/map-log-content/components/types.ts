export type CheckoutFilter = "any" | "checked_out_only" | "hide_checked_out";

export const checkoutFilterLabels: Record<CheckoutFilter, string> = {
  any: "All",
  checked_out_only: "Checked Out",
  hide_checked_out: "Checked In",
};

export type MapLogSortOrder =
  | "alphabetical"
  | "recent_activity"
  | "oldest_activity"
  | "checked_out";

export type MapLogFilters = {
  checkout_filter: CheckoutFilter;
  untagged_only: boolean;
  tag_ids: string[];
  min_weeks_since_activity: number | null;
  min_weeks_since_checkin: number;
};
