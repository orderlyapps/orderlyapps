import { afterEach, beforeEach, describe, expect, test, vi } from "vite-plus/test";
import type { AppSettings } from "../src/feature/settings/app-settings/types.ts";
import type { ThemeMode } from "../src/feature/settings/theme/types.ts";

const implementations = [
  { name: "Subbie", load: () => import("../src/feature/settings/theme/theme.ts") },
  { name: "shared", load: () => import("../../utils/src/theme/theme.ts") },
];

let media: MediaQueryList;

function createStore(mode: ThemeMode): AppSettings<{ themeMode: ThemeMode }> {
  return {
    get: async () => mode,
    getAll: async () => ({ themeMode: mode }),
    set: vi.fn(async () => {}),
    setMany: async () => {},
    remove: async () => {},
    clear: async () => {},
    replaceAll: async () => {},
    subscribe: () => () => {},
    close: async () => {},
  };
}

beforeEach(() => {
  vi.resetModules();
  media = new EventTarget() as MediaQueryList;
  Object.defineProperty(media, "matches", { value: false, writable: true });
  vi.spyOn(window, "matchMedia").mockReturnValue(media);
  document.documentElement.style.colorScheme = "";
  document.documentElement.classList.remove("ion-palette-dark");
  document.head.innerHTML = `
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111111">
  `;
});

afterEach(() => {
  vi.restoreAllMocks();
  document.head.innerHTML = "";
  document.documentElement.style.colorScheme = "";
  document.documentElement.classList.remove("ion-palette-dark");
});

describe.each(implementations)("$name theme", ({ load }) => {
  test("does not apply system changes before initialization", async () => {
    await load();
    media.dispatchEvent(new Event("change"));
    expect(document.documentElement.style.colorScheme).toBe("");
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute("content")).toBe(
      "#ffffff",
    );
  });

  test("preserves original colors across theme switches", async () => {
    const theme = await load();
    await theme.initTheme(createStore("light"));
    for (const mode of ["dark", "light", "dark"] as const) {
      theme.setMode(mode);
      for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
        expect(meta.getAttribute("content")).toBe(mode === "dark" ? "#111111" : "#ffffff");
      }
    }
  });

  test("continues responding to system changes after initialization", async () => {
    const theme = await load();
    await theme.initTheme(createStore("system"), { darkClass: "ion-palette-dark" });
    Object.defineProperty(media, "matches", { value: true });
    media.dispatchEvent(new Event("change"));
    expect(theme.getResolvedSnapshot()).toBe("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(true);
  });
});

test("an uninitialized shared theme cannot override Subbie's explicit mode", async () => {
  await implementations[1]!.load();
  const theme = await implementations[0]!.load();
  await theme.initTheme(createStore("dark"), { darkClass: "ion-palette-dark" });
  media.dispatchEvent(new Event("change"));
  expect(theme.getModeSnapshot()).toBe("dark");
  expect(document.documentElement.style.colorScheme).toBe("dark");
  expect(document.documentElement.classList.contains("ion-palette-dark")).toBe(true);
});
