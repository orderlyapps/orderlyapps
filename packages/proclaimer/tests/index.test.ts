import { expect, test } from "vite-plus/test";
import {
  createSupabaseClient,
  ProclaimerProvider,
  PublisherList,
  usePublishers,
  useSupabase,
  useSupabaseOrNull,
} from "../src/index.ts";

test("package exports", () => {
  expect(typeof createSupabaseClient).toBe("function");
  expect(typeof ProclaimerProvider).toBe("function");
  expect(typeof PublisherList).toBe("function");
  expect(typeof usePublishers).toBe("function");
  expect(typeof useSupabase).toBe("function");
  expect(typeof useSupabaseOrNull).toBe("function");
});
