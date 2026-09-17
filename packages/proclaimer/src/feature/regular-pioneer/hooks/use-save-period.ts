import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { useAuthSession } from "@amodeo/proclaimer/feature/permission";
import { regularPioneerCollection } from "../collections/regular-pioneer.ts";
import type { RegularPioneer } from "../schemas/regular-pioneer.ts";

interface PeriodInput {
  publisher_id: string;
  start_month: string;
  end_month: string | null;
}

export function useSavePeriod() {
  const session = useAuthSession();

  const save = (input: PeriodInput, existing?: RegularPioneer) => {
    const congregation_id = getStoredCongregation()?.id;
    if (!congregation_id) return;

    if (existing?.id) {
      regularPioneerCollection.update(existing.id, (draft) => {
        draft.publisher_id = input.publisher_id;
        draft.start_month = input.start_month;
        draft.end_month = input.end_month;
      });
      return;
    }

    regularPioneerCollection.insert({
      id: crypto.randomUUID(),
      publisher_id: input.publisher_id,
      congregation_id,
      start_month: input.start_month,
      end_month: input.end_month,
      created_by: session?.user?.id ?? null,
    });
  };

  const remove = (period: RegularPioneer) => {
    if (period.id) regularPioneerCollection.delete(period.id);
  };

  return { save, remove };
}
