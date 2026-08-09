import { eq } from "@tanstack/react-db";
import type { PublisherRecord } from "../publisher-schema.js";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { useFilteredPublishers } from "./use-filtered-publishers.js";

export type PublisherStanding = PublisherRecord["standing"];

export function usePublishersByStanding(standing: PublisherStanding): UsePublishersResult {
  return useFilteredPublishers((publisher) => eq(publisher.standing, standing), [standing]);
}
