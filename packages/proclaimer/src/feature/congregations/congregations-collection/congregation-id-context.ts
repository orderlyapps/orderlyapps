import { createContext, useContext } from "react";

/**
 * Provides the congregation id selected by the user during onboarding.
 *
 * The congregations collection uses this to scope its query: only rows whose
 * `congregation_id` is `null` (root congregations) or equal to this id are
 * fetched. The value is `undefined` before onboarding completes, in which case
 * only root congregations are returned — exactly what the congregation
 * selection step needs.
 */
export const CongregationIdContext = createContext<string | undefined>(undefined);

/** Returns the congregation id from the nearest provider, or `undefined`. */
export function useCongregationId(): string | undefined {
  return useContext(CongregationIdContext);
}
