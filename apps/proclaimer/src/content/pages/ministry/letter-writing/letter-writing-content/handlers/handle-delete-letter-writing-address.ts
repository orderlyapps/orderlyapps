import { notAtHomeCollection } from "@amodeo/proclaimer/feature/territory";

export function handleDeleteLetterWritingAddress(id: string): void {
  notAtHomeCollection.delete(id);
}
