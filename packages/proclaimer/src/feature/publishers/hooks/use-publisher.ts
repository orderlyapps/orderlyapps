import { eq } from "@tanstack/react-db";
import type { PublisherRecord } from "../publisher-schema.js";
import { usePublishers } from "./use-publishers.js";

export interface UsePublisherResult {
  data: PublisherRecord | undefined;
  isLoading: boolean;
  isError: boolean;
  isConfigured: boolean;
}

export function usePublisher(id: string | undefined): UsePublisherResult {
  const result = usePublishers((publisher) => eq(publisher.id, id ?? ""), [id]);

  return {
    data: result.data[0],
    isLoading: result.isLoading,
    isError: result.isError,
    isConfigured: result.isConfigured,
  };
}
