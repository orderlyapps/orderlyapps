import { expect, test, afterEach, vi } from "vite-plus/test";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";

import {
  createAppSettings,
  exportAppSettings,
  importAppSettings,
  parseAppSettings,
  resolveSettingsFileName,
  type AppSettings,
  type SettingsMap,
} from "../src/index.ts";

interface TestSettings extends SettingsMap {
  theme: "light" | "dark";
  notifications: boolean;
  volume: number;
}

const stores: AppSettings<TestSettings>[] = [];

async function makeStore(dbName: string): Promise<AppSettings<TestSettings>> {
  const store = await createAppSettings<TestSettings>({
    dbName,
    storage: getRxStorageMemory(),
  });
  stores.push(store);
  return store;
}

afterEach(async () => {
  await Promise.all(stores.splice(0).map((store) => store.close()));
});

test("export and import round-trip settings between stores", async () => {
  const source = await makeStore("transfer-source");
  await source.setMany({ theme: "dark", volume: 42, notifications: true });

  const json = await exportAppSettings(source, { download: false });
  expect(JSON.parse(json)).toEqual({ theme: "dark", volume: 42, notifications: true });

  const target = await makeStore("transfer-target");
  await target.setMany({ theme: "light", volume: 0, notifications: false });
  await importAppSettings(target, json);

  expect(await target.getAll()).toEqual({ theme: "dark", volume: 42, notifications: true });
});

test("import merges over existing values by default", async () => {
  const store = await makeStore("import-merge");
  await store.setMany({ theme: "light", volume: 10 });

  await importAppSettings(store, JSON.stringify({ volume: 90 }));

  expect(await store.getAll()).toEqual({ theme: "light", volume: 90 });
});

test("import with replace clears existing values first", async () => {
  const store = await makeStore("import-replace");
  await store.setMany({ theme: "light", volume: 10 });

  await importAppSettings(store, JSON.stringify({ volume: 90 }), { replace: true });

  expect(await store.getAll()).toEqual({ volume: 90 });
});

test("import with replace still filters unknown keys", async () => {
  const store = await makeStore("import-replace-filter");
  await store.setMany({ theme: "light", volume: 10 });

  await importAppSettings(store, JSON.stringify({ volume: 90, unknownKey: "malicious" }), {
    replace: true,
  });

  const all = await store.getAll();
  expect(all).toEqual({ volume: 90 });
  expect("unknownKey" in all).toBe(false);
});

test("import into empty store writes nothing", async () => {
  const store = await makeStore("import-empty");

  await importAppSettings(store, JSON.stringify({ volume: 90, theme: "dark" }));

  expect(await store.getAll()).toEqual({});
});

test("parseAppSettings rejects non-finite numbers", () => {
  expect(() => parseAppSettings('{"a":1e400}')).toThrow("not JSON-serialisable");
});

test("parseAppSettings rejects non-JSON input", () => {
  expect(() => parseAppSettings("not json")).toThrow("not valid JSON");
});

test("parseAppSettings rejects non-object JSON", () => {
  expect(() => parseAppSettings("[1,2,3]")).toThrow("must contain a JSON object");
  expect(() => parseAppSettings("42")).toThrow("must contain a JSON object");
});

test("import ignores keys not already present in the store", async () => {
  const store = await makeStore("import-filter");
  await store.setMany({ theme: "light", volume: 10 });

  await importAppSettings(store, JSON.stringify({ volume: 90, unknownKey: "malicious" }));

  const all = await store.getAll();
  expect(all).toEqual({ theme: "light", volume: 90 });
  expect("unknownKey" in all).toBe(false);
});

test("import rejects when the underlying store write fails", async () => {
  const failingStore = {
    getAll: async () => ({ theme: "light" }) as Partial<TestSettings>,
    setMany: vi.fn().mockRejectedValue(new Error("disk full")),
    clear: vi.fn().mockResolvedValue(undefined),
  } as unknown as AppSettings<TestSettings>;

  await expect(importAppSettings(failingStore, JSON.stringify({ theme: "dark" }))).rejects.toThrow(
    "disk full",
  );
});

test("import with replace rejects when clear fails and skips the write", async () => {
  const setMany = vi.fn().mockResolvedValue(undefined);
  const failingStore = {
    getAll: async () => ({ theme: "light" }) as Partial<TestSettings>,
    setMany,
    clear: vi.fn().mockRejectedValue(new Error("disk full")),
  } as unknown as AppSettings<TestSettings>;

  await expect(
    importAppSettings(failingStore, JSON.stringify({ theme: "dark" }), { replace: true }),
  ).rejects.toThrow("disk full");
  expect(setMany).not.toHaveBeenCalled();
});

test("resolveSettingsFileName combines base name and extension", () => {
  expect(resolveSettingsFileName()).toBe("app-settings.json");
  expect(resolveSettingsFileName("my-settings", "backup")).toBe("my-settings.backup");
  expect(resolveSettingsFileName("my-settings", ".backup")).toBe("my-settings.backup");
});
