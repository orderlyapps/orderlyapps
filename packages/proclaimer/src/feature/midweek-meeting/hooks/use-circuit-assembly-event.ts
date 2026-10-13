import { useEventInWeek } from "./use-event-in-week.ts";

export function useCircuitAssemblyEvent(week_id: string) {
  return useEventInWeek(week_id, "circuit_assembly");
}
