import { notAtHomeCollection } from "@amodeo/proclaimer/feature/territory";

export function handleToggleNotAtHomeWrite(id: string, currentWrite: boolean): void {
  notAtHomeCollection.update(id, (draft) => {
    draft.write = !currentWrite;
  });
}
