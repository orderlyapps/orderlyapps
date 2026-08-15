import { vi } from "vite-plus/test";
import { testQueryClient, setResetFn } from "./test-query-client.ts";

// Mock the publisher collection so tests don't import the real persistence
// layer (which requires OPFS, unavailable in happy-dom). The mock creates a
// plain query-backed collection wired to the database context's getSupabase()
// so each test's mock supabase (set via initDatabase in createWrapper) is used.
vi.mock("../src/database/collections/publisher.ts", async () => {
  const [
    { createCollection },
    { queryCollectionOptions },
    { getSupabase, initDatabase },
    { publisherSchema },
  ] = await Promise.all([
    import("@tanstack/react-db"),
    import("@tanstack/query-db-collection"),
    import("../src/database/context.ts"),
    import("../src/database/schemas/publisher.ts"),
  ]);

  // Initialize with a dummy supabase so getSupabase() can resolve. The real
  // mock supabase is set per-test via initDatabase in createWrapper.
  initDatabase({
    supabase: {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    } as never,
    queryClient: testQueryClient,
  });

  function create() {
    return createCollection(
      queryCollectionOptions({
        id: "publisher",
        queryKey: ["publisher"],
        queryClient: testQueryClient,
        schema: publisherSchema,
        getKey: (row: { id?: string }) => row.id ?? "",
        queryFn: async () => {
          const supabase = getSupabase();
          const { data, error } = await supabase.from("publisher").select("*");
          if (error) throw error;
          return data ?? [];
        },
        onUpdate: async ({ transaction }) => {
          const supabase = getSupabase();
          for (const mutation of transaction.mutations) {
            const { error } = await supabase
              .from("publisher")
              .update(mutation.modified)
              .eq("id", mutation.key);
            if (error) throw error;
          }
        },
      }),
    );
  }

  let collection = create();
  setResetFn(() => {
    collection = create();
  });

  return {
    get publisherCollection() {
      return collection;
    },
  };
});

// happy-dom's CSS parser crashes when Ionic's Stencil runtime calls
// CSSStyleSheet.replaceSync()/replace() with an undefined stylesheet string
// (happens when an ion-item contains a coloured ion-label). The throw aborts
// the custom-element upgrade and the element's text children never render.
// oxlint-disable-next-line typescript/unbound-method -- rebound via .call below
const originalReplaceSync = CSSStyleSheet.prototype.replaceSync;
CSSStyleSheet.prototype.replaceSync = function (text?: string) {
  return originalReplaceSync.call(this, text ?? "");
};

// oxlint-disable-next-line typescript/unbound-method -- rebound via .call below
const originalReplace = CSSStyleSheet.prototype.replace;
CSSStyleSheet.prototype.replace = function (text?: string) {
  return originalReplace.call(this, text ?? "");
};
