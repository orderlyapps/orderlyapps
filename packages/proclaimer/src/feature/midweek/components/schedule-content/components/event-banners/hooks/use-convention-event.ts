import { useEventInWeek } from "./use-event-in-week.ts";

export function useConventionEvent(week_id: string) {
  return useEventInWeek(week_id, "convention");
}
