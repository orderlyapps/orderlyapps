import { useLiveQuery, eq } from "@tanstack/react-db";
import { regularPioneerCollection } from "../collections/regular-pioneer.ts";
import type { RegularPioneer } from "../schemas/regular-pioneer.ts";

export function usePioneerPeriods(publisher_id?: string) {
  const { data, isLoading } = useLiveQuery(
    (q) => {
      const base = q.from({ rp: regularPioneerCollection });
      return publisher_id ? base.where(({ rp }) => eq(rp.publisher_id, publisher_id)) : base;
    },
    [publisher_id],
  );

  return { periods: (data ?? []) as RegularPioneer[], isLoading };
}
