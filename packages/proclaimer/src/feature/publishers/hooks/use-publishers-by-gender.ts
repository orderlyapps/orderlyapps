import { eq } from "@tanstack/react-db";
import type { PublisherRecord } from "../publisher-schema.js";
import type { UsePublishersResult } from "./use-publishers-base.js";
import { useFilteredPublishers } from "./use-filtered-publishers.js";

export type PublisherGender = PublisherRecord["gender"];

export function usePublishersByGender(gender: PublisherGender): UsePublishersResult {
  return useFilteredPublishers((publisher) => eq(publisher.gender, gender), [gender]);
}
