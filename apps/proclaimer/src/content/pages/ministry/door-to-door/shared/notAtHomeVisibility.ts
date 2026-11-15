export type NotAtHomeVisibility = "all" | "hide_old" | "hide_new";

export function isValidNotAtHomeVisibility(value: string | null): value is NotAtHomeVisibility {
  return value === "all" || value === "hide_old" || value === "hide_new";
}
