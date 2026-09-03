import { returnVisitCollection } from "@amodeo/proclaimer/feature/territory";
import type { VisitLogEntry } from "@amodeo/proclaimer/feature/territory";

export function handleEditVisit(
  id: string,
  visitId: string,
  entry: Omit<VisitLogEntry, "id">,
): void {
  returnVisitCollection.update(id, (draft) => {
    const visit = draft.visit_log.find((v) => v.id === visitId);
    if (visit) {
      visit.visited_at = entry.visited_at;
      visit.notes = entry.notes;
    }
  });
}
