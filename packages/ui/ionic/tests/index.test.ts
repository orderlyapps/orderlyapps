import { expect, test } from "vite-plus/test";
import { IonicApp } from "../src/index.ts";

test("exports IonicApp component", () => {
  expect(IonicApp).toBeTypeOf("function");
});
