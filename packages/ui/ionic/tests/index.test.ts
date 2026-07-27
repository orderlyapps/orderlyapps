import { expect, test } from "vite-plus/test";
import { SimpleGreeting } from "../src/index.ts";

test("exports SimpleGreeting component", () => {
  expect(SimpleGreeting).toBeTypeOf("function");
});
