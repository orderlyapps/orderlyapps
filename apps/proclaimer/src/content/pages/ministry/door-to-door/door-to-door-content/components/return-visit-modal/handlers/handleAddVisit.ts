import { returnVisitCollection } from "@amodeo/proclaimer/database/collections/return-visit";
import type { VisitLogEntry } from "@amodeo/proclaimer/database/schemas/return-visit";

export function handleAddVisit(id: string, entry: Omit<VisitLogEntry, "id">): void {
  returnVisitCollection.update(id, (draft) => {
    draft.visit_log.push({ ...entry, id: crypto.randomUUID() });
  });
}
