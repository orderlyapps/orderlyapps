import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import {
  exportAppSettings,
  importAppSettings,
} from "../src/feature/settings/app-settings/settings-transfer.ts";
import type { AppSettings, SettingsMap } from "../src/feature/settings/app-settings/types.ts";

function createStore() {
  return {
    get: vi.fn(),
    getAll: vi.fn(async () => ({ themeMode: "dark", fontSize: "md" })),
    set: vi.fn(),
    setMany: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
    replaceAll: vi.fn(),
    subscribe: vi.fn(),
    close: vi.fn(),
  } satisfies AppSettings<SettingsMap>;
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("local settings transfer", () => {
  test("exports the existing JSON format and custom file extension", async () => {
    vi.useFakeTimers();
    let blob: Blob | undefined;
    vi.spyOn(URL, "createObjectURL").mockImplementation((value) => {
      blob = value as Blob;
      return "blob:settings";
    });
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        expect(this.download).toBe("subbie-settings.settings.sub");
        expect(this.isConnected).toBe(true);
      });
    await exportAppSettings(createStore(), {
      fileName: "subbie-settings",
      extension: ".settings.sub",
    });
    expect(click).toHaveBeenCalledOnce();
    expect(JSON.parse(await blob!.text())).toEqual({ themeMode: "dark", fontSize: "md" });
    expect(document.querySelector("a[download]")).toBeNull();
    vi.runAllTimers();
    expect(revoke).toHaveBeenCalledWith("blob:settings");
  });

  test("merges known settings and reports unknown keys", async () => {
    const store = createStore();
    await expect(importAppSettings(store, '{"themeMode":"light","unknown":true}')).resolves.toEqual(
      {
        imported: ["themeMode"],
        skipped: ["unknown"],
      },
    );
    expect(store.setMany).toHaveBeenCalledWith({ themeMode: "light" });
    expect(store.replaceAll).not.toHaveBeenCalled();
  });

  test("supports replacing settings", async () => {
    const store = createStore();
    await importAppSettings(store, '{"fontSize":"lg"}', { replace: true });
    expect(store.replaceAll).toHaveBeenCalledWith({ fontSize: "lg" });
    expect(store.setMany).not.toHaveBeenCalled();
  });

  test.each([
    "invalid",
    "null",
    "[]",
    "{}",
    '{"unknown":true}',
    '{"themeMode":"light","fontSize":42}',
    '{"fontSize":1e400}',
  ])("rejects invalid input without changing settings: %s", async (json) => {
    const store = createStore();
    await expect(importAppSettings(store, json, { replace: true })).rejects.toThrow();
    expect(store.setMany).not.toHaveBeenCalled();
    expect(store.replaceAll).not.toHaveBeenCalled();
  });
});
