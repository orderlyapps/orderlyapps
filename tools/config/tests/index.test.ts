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
  const config = reactAppDefaults({
    name: "Test App",
    short_name: "TestApp",
    description: "A test app",
    theme_color: "#ffffff",
    background_color: "#ffffff",
  });
  expect(config.lint?.plugins).toEqual(["react", "typescript", "oxc"]);
  expect(config.lint?.rules).toMatchObject({
    "react/rules-of-hooks": "error",
    "vite-plus/prefer-vite-plus-imports": "error",
  });
  expect(config.lint?.options).toEqual({
    typeAware: true,
    typeCheck: true,
  });
});
