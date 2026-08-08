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

test("import with replace replaces existing values", async () => {
  const store = await makeStore("import-replace");
  await store.setMany({ theme: "light", volume: 10 });

  await importAppSettings(store, JSON.stringify({ volume: 90 }), { replace: true });

  expect(await store.getAll()).toEqual({ volume: 90 });
});

test("import with replace re-seeds defaults for keys missing from the file", async () => {
  const store = await createAppSettings<TestSettings>({
    dbName: "import-replace-defaults",
    storage: getRxStorageMemory(),
    defaults: { theme: "light", notifications: true, volume: 10 },
  });
  stores.push(store);
  await store.setMany({ theme: "dark", volume: 50 });

  await importAppSettings(store, JSON.stringify({ volume: 90 }), { replace: true });

  expect(await store.getAll()).toEqual({ theme: "light", notifications: true, volume: 90 });
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

test("import into empty store throws and writes nothing", async () => {
  const store = await makeStore("import-empty");

  await expect(
    importAppSettings(store, JSON.stringify({ volume: 90, theme: "dark" })),
  ).rejects.toThrow("nothing was imported");

  expect(await store.getAll()).toEqual({});
});

test("import with replace and no matching keys throws without clearing", async () => {
  const store = await makeStore("import-replace-no-match");
  await store.setMany({ theme: "light", volume: 10 });

  await expect(
    importAppSettings(store, JSON.stringify({ unknownKey: "malicious" }), { replace: true }),
  ).rejects.toThrow("nothing was imported");

  expect(await store.getAll()).toEqual({ theme: "light", volume: 10 });
});

test("import reports imported and skipped keys", async () => {
  const store = await makeStore("import-result");
  await store.setMany({ theme: "light", volume: 10 });

  const result = await importAppSettings(
    store,
    JSON.stringify({ volume: 90, unknownKey: "malicious" }),
  );

  expect(result).toEqual({ imported: ["volume"], skipped: ["unknownKey"] });
});

test("import rejects values whose type differs from the stored value", async () => {
  const store = await makeStore("import-type-mismatch");
  await store.setMany({ theme: "light", volume: 10 });

  await expect(importAppSettings(store, JSON.stringify({ volume: "loud" }))).rejects.toThrow(
    'Setting "volume" has type "number"',
  );

  expect(await store.getAll()).toEqual({ theme: "light", volume: 10 });
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

test("import with replace rejects when the write fails", async () => {
  const failingStore = {
    getAll: async () => ({ theme: "light" }) as Partial<TestSettings>,
    setMany: vi.fn().mockResolvedValue(undefined),
    replaceAll: vi.fn().mockRejectedValue(new Error("disk full")),
  } as unknown as AppSettings<TestSettings>;

  await expect(
    importAppSettings(failingStore, JSON.stringify({ theme: "dark" }), { replace: true }),
  ).rejects.toThrow("disk full");
});

test("import with replace writes atomically via replaceAll", async () => {
  const setMany = vi.fn().mockResolvedValue(undefined);
  const clear = vi.fn().mockResolvedValue(undefined);
  const replaceAll = vi.fn().mockResolvedValue(undefined);
  const mockStore = {
    getAll: async () => ({ theme: "light" }) as Partial<TestSettings>,
    setMany,
    clear,
    replaceAll,
  } as unknown as AppSettings<TestSettings>;

  await importAppSettings(mockStore, JSON.stringify({ theme: "dark" }), { replace: true });

  expect(replaceAll).toHaveBeenCalledWith({ theme: "dark" });
  expect(clear).not.toHaveBeenCalled();
  expect(setMany).not.toHaveBeenCalled();
});

test("import accepts any type for a setting stored as null", async () => {
  const store = await makeStore("import-null-stored");
  await store.setMany({ volume: null as unknown as number, theme: "light" });

  await importAppSettings(store, JSON.stringify({ volume: 90 }));

  expect((await store.getAll()).volume).toBe(90);
});

test("resolveSettingsFileName combines base name and extension", () => {
  expect(resolveSettingsFileName()).toBe("app-settings.json");
  expect(resolveSettingsFileName("my-settings", "backup")).toBe("my-settings.backup");
  expect(resolveSettingsFileName("my-settings", ".backup")).toBe("my-settings.backup");
});
