import { eq } from "@tanstack/react-db";
import type { PublisherRecord } from "../publisher-schema.js";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { useFilteredPublishers } from "./use-filtered-publishers.js";

export type PublisherType = PublisherRecord["type"];

export function usePublishersByType(type: PublisherType): UsePublishersResult {
  return useFilteredPublishers((publisher) => eq(publisher.type, type), [type]);
}
