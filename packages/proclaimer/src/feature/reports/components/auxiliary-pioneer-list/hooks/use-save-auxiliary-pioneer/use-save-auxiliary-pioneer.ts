import { eq, useLiveQuery } from "@tanstack/react-db";
import { getStoredCongregation } from "@amodeo/proclaimer/feature/congregation";
import { makeCompositeKey } from "@amodeo/proclaimer/database/util/composite-key";
import { publisherCollection } from "../../../../../publisher/collections/publisher.ts";
import { publisherLocalCollection } from "../../../../../publisher-local/collections/publisher-local.ts";
import { reportCollection } from "../../../../collections/report.ts";

interface SaveInput {
  publisher_id: string;
  group_id: string | null;
  continuous: boolean;
}

/**
 * Enrolls a publisher as an auxiliary pioneer — either by setting their
 * `type` to `"continuous_auxiliary"`, or by flagging `aux_pio` on their
 * report for the given month (YYYY-MM), creating the report if needed.
 */
export function useSaveAuxiliaryPioneer(month: string) {
  const month_date = `${month}-01`;

  const { data: local_data, isLoading: local_loading } = useLiveQuery(
    (q) => q.from({ pl: publisherLocalCollection }),
    [],
  );
  const { data: month_reports, isLoading: reports_loading } = useLiveQuery(
    (q) => q.from({ r: reportCollection }).where(({ r }) => eq(r.date, month_date)),
    [month_date],
  );

  const save = ({ publisher_id, group_id, continuous }: SaveInput): string | null => {
    const congregation_id = getStoredCongregation()?.id;
    if (!congregation_id) return "No congregation selected.";

    if (continuous) {
      publisherCollection.update(publisher_id, (draft) => {
        draft.type = "continuous_auxiliary";
      });
      return null;
    }

    const confidential_id = (local_data ?? []).find(
      (l) => l.publisher_id === publisher_id,
    )?.confidential_id;
    if (!confidential_id) return "No confidential ID found for this publisher.";

    const existing = (month_reports ?? []).find((r) => r.confidential_id === confidential_id);
    if (existing) {
      reportCollection.update(
        makeCompositeKey(confidential_id, existing.congregation_id, existing.date),
        (draft) => {
          draft.aux_pio = true;
        },
      );
    } else {
      reportCollection.insert({
        confidential_id,
        congregation_id,
        group_id,
        date: month_date,
        active: false,
        aux_pio: true,
        reg_pio: false,
        spe_pio: false,
        reported_elsewhere: false,
        hours: null,
        bible_studies: null,
        credit_hours: null,
        comments: null,
      });
    }

    return null;
  };

  return { save, is_loading: local_loading || reports_loading };
}
