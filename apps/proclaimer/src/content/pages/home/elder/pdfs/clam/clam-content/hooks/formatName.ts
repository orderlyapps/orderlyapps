import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@amodeo/proclaimer/database/schemas/publisher";

export function formatName(publisher: Publisher | undefined): string {
  if (!publisher) return "";
  return getPublisherDisplayName(publisher);
}
