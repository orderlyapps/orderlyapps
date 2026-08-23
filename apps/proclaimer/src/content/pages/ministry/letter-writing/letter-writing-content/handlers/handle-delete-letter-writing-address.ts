import { notAtHomeCollection } from "@amodeo/proclaimer/database/collections/not-at-home";

export function handleDeleteLetterWritingAddress(id: string): void {
  notAtHomeCollection.delete(id);
}
