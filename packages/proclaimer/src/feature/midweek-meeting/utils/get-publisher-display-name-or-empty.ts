import { getPublisherDisplayName } from "@amodeo/proclaimer/feature/publisher";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";

export function getPublisherDisplayNameOrEmpty(publisher: Publisher | undefined): string {
  if (!publisher) return "";
  return getPublisherDisplayName(publisher);
}
