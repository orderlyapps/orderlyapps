import { doNotCallCollection } from "@amodeo/proclaimer/database/collections/do-not-call";
import type { DoNotCall } from "../types";

export function handleUpdateDoNotCallLocation(
  records: DoNotCall[],
  coordinates: [number, number],
): void {
  for (const record of records) {
    doNotCallCollection.update(record.id, (draft) => {
      draft.coordinates = coordinates;
    });
  }
}
