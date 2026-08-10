import type { CongregationRecord } from "../congregation-schema.js";
import { useCongregations } from "./use-congregations.js";

export interface UseCongregationResult {
  data: CongregationRecord | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isConfigured: boolean;
}

export function useCongregation(id: string | undefined): UseCongregationResult {
  // Without a usable id nothing can match, so skip the subscription entirely
  // and report an idle result
  const result = useCongregations({
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
