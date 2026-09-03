import { notAtHomeCollection } from "@amodeo/proclaimer/feature/territory";

export function handleDeleteNotAtHome(id: string): void {
  notAtHomeCollection.delete(id);
}
