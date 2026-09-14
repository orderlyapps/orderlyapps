import type { PublisherFilter } from "../use-publisher-filter/usePublisherFilter.ts";
import type { PublisherSortOrder } from "../use-publisher-sort/types.ts";

export interface FilterSortPreset {
  id: string;
  name: string;
  filter: PublisherFilter;
  sort_order: PublisherSortOrder;
}
