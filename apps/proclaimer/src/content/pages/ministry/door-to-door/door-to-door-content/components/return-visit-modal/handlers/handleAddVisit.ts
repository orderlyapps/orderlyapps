import { returnVisitCollection } from "@amodeo/proclaimer/feature/territory";
import type { VisitLogEntry } from "@amodeo/proclaimer/feature/territory";

export function handleAddVisit(id: string, entry: Omit<VisitLogEntry, "id">): void {
  returnVisitCollection.update(id, (draft) => {
    draft.visit_log.push({ ...entry, id: crypto.randomUUID() });
  });
}
