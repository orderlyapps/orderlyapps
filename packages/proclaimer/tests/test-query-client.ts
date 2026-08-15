import { QueryClient } from "@tanstack/react-query";

/**
 * Shared QueryClient reused across tests so the singleton publisherCollection's
 * QueryObserver stays subscribed to the same QueryCache. The vi.mock factory
 * in setup.ts uses this when creating the mock collection, and createWrapper
 * calls resetPublisherCollection() before each test to get a fresh collection.
 */
export const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

let resetFn: (() => void) | null = null;

/** Called by the vi.mock factory to register the collection reset function. */
export function setResetFn(fn: () => void): void {
  resetFn = fn;
}

/** Re-creates the mock publisherCollection and clears the query cache. */
export function resetPublisherCollection(): void {
  testQueryClient.clear();
  resetFn?.();
}
