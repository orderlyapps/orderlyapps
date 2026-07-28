import { expect, test } from "vite-plus/test";
import { libraryDefaults, reactAppDefaults } from "../src/index.ts";

test("libraryDefaults", () => {
  expect(libraryDefaults.pack).toEqual({ dts: true, exports: true });
  expect(libraryDefaults.lint).toEqual({
    options: { typeAware: true, typeCheck: true },
  });
  expect(libraryDefaults.fmt).toEqual({});
});

test("reactAppDefaults", () => {
  expect(reactAppDefaults.lint?.plugins).toEqual(["react", "typescript", "oxc"]);
  expect(reactAppDefaults.lint?.rules).toMatchObject({
    "react/rules-of-hooks": "error",
    "vite-plus/prefer-vite-plus-imports": "error",
  });
  expect(reactAppDefaults.lint?.options).toEqual({
    typeAware: true,
    typeCheck: true,
  });
});
