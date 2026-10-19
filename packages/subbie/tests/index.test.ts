import { expect, test } from "vite-plus/test";
import {
  AboutContent,
  DetailsContent,
  EditProfileContent,
  getAppSettings,
  HomeContent,
  ProfileContent,
  SettingsContent,
} from "../src/index.ts";

test("package exports", () => {
  expect(typeof getAppSettings).toBe("function");
  expect(typeof HomeContent).toBe("function");
  expect(typeof DetailsContent).toBe("function");
  expect(typeof ProfileContent).toBe("function");
  expect(typeof EditProfileContent).toBe("function");
  expect(typeof SettingsContent).toBe("function");
  expect(typeof AboutContent).toBe("function");
});
