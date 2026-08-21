import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@amodeo/proclaimer/feature/publishers/publisher-schema";

export function formatName(publisher: Publisher | undefined): string {
  if (!publisher) return "";
  return getPublisherDisplayName(publisher);
}
