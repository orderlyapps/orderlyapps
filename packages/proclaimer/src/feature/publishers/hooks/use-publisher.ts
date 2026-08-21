import type { PublisherRecord } from "../publisher-schema.js";
import { usePublishers } from "./use-publishers.js";

export interface UsePublisherResult {
  data: PublisherRecord | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isConfigured: boolean;
}

export function usePublisher(id: string | undefined): UsePublisherResult {
  // Without a usable id nothing can match, so skip the subscription entirely
  // and report an idle result
  const result = usePublishers({
    enabled: Boolean(id),
    filter: { column: "id", op: "eq", value: id ?? "" },
  });

  return {
    data: result.data[0],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    isConfigured: result.isConfigured,
  };
}
