import { expect, test, afterEach } from "vite-plus/test";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";

import {
  createAppDatabase,
  createAppSettings,
  exportAppDatabase,
  importAppDatabase,
  parseAppDatabase,
  type AppDatabase,
  type AppSettings,
  type SettingsMap,
} from "../src/index.ts";

interface Preferences extends SettingsMap {
  fontSize: string;
  themeMode: string;
}

interface Onboarding extends SettingsMap {
  congregationId: string;
  onboardingComplete: boolean;
}

const databases: AppDatabase[] = [];
const stores: AppSettings<SettingsMap>[] = [];

async function makeDatabase(name: string): Promise<AppDatabase> {
  const db = await createAppDatabase({ name, storage: getRxStorageMemory() });
  databases.push(db);
  return db;
}

afterEach(async () => {
  await Promise.all(stores.splice(0).map((s) => s.close()));
  await Promise.all(databases.splice(0).map((db) => db.close()));
});

test("multiple stores share one database via different doc IDs", async () => {
  const db = await makeDatabase("shared-isolation");

  const preferences = await createAppSettings<Preferences>({
    database: db,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(preferences);

  const onboarding = await createAppSettings<Onboarding>({
    database: db,
    docId: "onboarding",
    defaults: { congregationId: "", onboardingComplete: false },
  });
  stores.push(onboarding);

  await preferences.set("fontSize", "lg");
  await onboarding.set("congregationId", "abc-123");

  expect(await preferences.get("fontSize")).toBe("lg");
  expect(await onboarding.get("congregationId")).toBe("abc-123");

  // Stores don't leak into each other.
  expect(await preferences.get("congregationId")).toBeUndefined();
  expect(await onboarding.get("fontSize")).toBeUndefined();
});

test("shared store close does not close the shared database", async () => {
  const db = await makeDatabase("shared-close");
  const store = await createAppSettings<Preferences>({
    database: db,
    docId: "preferences",
  });
  stores.push(store);

  await store.close();

  // Database should still be usable.
  const another = await createAppSettings<Onboarding>({
    database: db,
    docId: "onboarding",
  });
  stores.push(another);
  await another.set("congregationId", "xyz");
  expect(await another.get("congregationId")).toBe("xyz");
});

test("exportAppDatabase serializes all docs in the shared database", async () => {
  const db = await makeDatabase("shared-export");

  const preferences = await createAppSettings<Preferences>({
    database: db,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(preferences);

  const onboarding = await createAppSettings<Onboarding>({
    database: db,
    docId: "onboarding",
    defaults: { congregationId: "", onboardingComplete: false },
  });
  stores.push(onboarding);

  await preferences.set("fontSize", "xl");
  await onboarding.set("onboardingComplete", true);

  const json = await exportAppDatabase(db, { download: false });
  const parsed = JSON.parse(json);

  expect(parsed).toEqual({
    preferences: { fontSize: "xl", themeMode: "system" },
    onboarding: { congregationId: "", onboardingComplete: true },
  });
});

test("importAppDatabase round-trips all docs between databases", async () => {
  const source = await makeDatabase("shared-import-source");
  const target = await makeDatabase("shared-import-target");

  const sourcePrefs = await createAppSettings<Preferences>({
    database: source,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(sourcePrefs);

  const sourceOnboarding = await createAppSettings<Onboarding>({
    database: source,
    docId: "onboarding",
    defaults: { congregationId: "", onboardingComplete: false },
  });
  stores.push(sourceOnboarding);

  const targetPrefs = await createAppSettings<Preferences>({
    database: target,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(targetPrefs);

  const targetOnboarding = await createAppSettings<Onboarding>({
    database: target,
    docId: "onboarding",
    defaults: { congregationId: "", onboardingComplete: false },
  });
  stores.push(targetOnboarding);

  await sourcePrefs.set("fontSize", "lg");
  await sourceOnboarding.set("congregationId", "cong-1");
  await sourceOnboarding.set("onboardingComplete", true);

  const json = await exportAppDatabase(source, { download: false });
  const result = await importAppDatabase(target, json);

  expect(result.imported).toContain("preferences");
  expect(result.imported).toContain("onboarding");
  expect(result.skipped).toEqual([]);

  expect(await targetPrefs.get("fontSize")).toBe("lg");
  expect(await targetOnboarding.get("congregationId")).toBe("cong-1");
  expect(await targetOnboarding.get("onboardingComplete")).toBe(true);
});

test("importAppDatabase merges by default and replaces with replace: true", async () => {
  const source = await makeDatabase("shared-import-mode-source");
  const target = await makeDatabase("shared-import-mode-target");

  const sourcePrefs = await createAppSettings<Preferences>({
    database: source,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(sourcePrefs);

  const targetPrefs = await createAppSettings<Preferences>({
    database: target,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(targetPrefs);

  await targetPrefs.setMany({ fontSize: "sm", themeMode: "dark" });
  await sourcePrefs.set("fontSize", "xl");

  // Merge: keeps existing themeMode, updates fontSize.
  const mergeJson = JSON.stringify({ preferences: { fontSize: "xl" } });
  await importAppDatabase(target, mergeJson);
  expect(await targetPrefs.getAll()).toEqual({ fontSize: "xl", themeMode: "dark" });

  // Replace: wipes keys not in the import.
  const replaceJson = JSON.stringify({ preferences: { fontSize: "2xl" } });
  await importAppDatabase(target, replaceJson, { replace: true });
  expect(await targetPrefs.getAll()).toEqual({ fontSize: "2xl" });
});

test("importAppDatabase skips unknown doc IDs", async () => {
  const db = await makeDatabase("shared-import-skip");
  const store = await createAppSettings<Preferences>({
    database: db,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(store);

  const result = await importAppDatabase(
    db,
    JSON.stringify({ preferences: { fontSize: "lg" }, unknown: { foo: "bar" } }),
  );

  expect(result.imported).toEqual(["preferences"]);
  expect(result.skipped).toEqual(["unknown"]);
  expect(await store.get("fontSize")).toBe("lg");
});

test("importAppDatabase throws when no docs apply", async () => {
  const db = await makeDatabase("shared-import-empty");
  await createAppSettings<Preferences>({
    database: db,
    docId: "preferences",
    defaults: { fontSize: "md", themeMode: "system" },
  });

  await expect(importAppDatabase(db, JSON.stringify({ unknown: { foo: "bar" } }))).rejects.toThrow(
    "nothing was imported",
  );
});

test("parseAppDatabase rejects invalid structures", () => {
  expect(() => parseAppDatabase("not json")).toThrow("not valid JSON");
  expect(() => parseAppDatabase("[1,2,3]")).toThrow("must contain a JSON object");
  expect(() => parseAppDatabase('{"prefs": "not-an-object"}')).toThrow(
    "must contain a JSON object",
  );
  expect(() => parseAppDatabase('{"prefs": {"a": 1e400}}')).toThrow("not JSON-serialisable");
});

test("standalone mode still works without a shared database", async () => {
  const store = await createAppSettings<Preferences>({
    dbName: "standalone-still-works",
    storage: getRxStorageMemory(),
    defaults: { fontSize: "md", themeMode: "system" },
  });
  stores.push(store);

  await store.set("fontSize", "lg");
  expect(await store.get("fontSize")).toBe("lg");
});

test("createAppSettings throws when neither database nor dbName is provided", async () => {
  await expect(createAppSettings<Preferences>({ storage: getRxStorageMemory() })).rejects.toThrow(
    "requires either `database` or `dbName`",
  );
});
