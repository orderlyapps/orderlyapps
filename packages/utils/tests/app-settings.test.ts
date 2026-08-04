import { expect, test, afterEach } from "vite-plus/test";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";

import { createAppSettings, type AppSettings, type SettingsMap } from "../src/index.ts";

interface TestSettings extends SettingsMap {
  theme: "light" | "dark";
  notifications: boolean;
  volume: number;
}

const stores: AppSettings<TestSettings>[] = [];

async function makeStore(
  dbName: string,
  defaults?: Partial<TestSettings>,
): Promise<AppSettings<TestSettings>> {
  const store = await createAppSettings<TestSettings>({
    dbName,
    defaults,
    storage: getRxStorageMemory(),
  });
  stores.push(store);
  return store;
}

afterEach(async () => {
  await Promise.all(stores.splice(0).map((store) => store.close()));
});

test("seeds defaults for missing keys without overwriting stored values", async () => {
  const store = await makeStore("seed-1", {
    theme: "light",
    notifications: true,
    volume: 50,
  });

  expect(await store.getAll()).toEqual({
    theme: "light",
    notifications: true,
    volume: 50,
  });

  await store.set("theme", "dark");

  const reopened = await makeStore("seed-1", {
    theme: "light",
    notifications: true,
    volume: 50,
  });

  // Stored "dark" must win over the default "light".
  expect(await reopened.get("theme")).toBe("dark");
  expect(await reopened.get("notifications")).toBe(true);
});

test("set and get round-trip a value", async () => {
  const store = await makeStore("set-get");
  expect(await store.get("volume")).toBeUndefined();

  await store.set("volume", 75);
  expect(await store.get("volume")).toBe(75);
  expect(await store.getAll()).toEqual({ volume: 75 });
});

test("setMany writes multiple keys in one operation", async () => {
  const store = await makeStore("set-many");
  await store.setMany({ theme: "dark", volume: 10 });

  expect(await store.get("theme")).toBe("dark");
  expect(await store.get("volume")).toBe(10);
});

test("remove deletes a single key", async () => {
  const store = await makeStore("remove");
  await store.setMany({ theme: "dark", volume: 10 });
  await store.remove("volume");

  expect(await store.get("volume")).toBeUndefined();
  expect(await store.get("theme")).toBe("dark");
});

test("clear wipes every key", async () => {
  const store = await makeStore("clear", { theme: "light" });
  await store.set("volume", 5);
  await store.clear();

  expect(await store.getAll()).toEqual({});
});

test("subscribe emits the current snapshot and updates on change", async () => {
  const store = await makeStore("subscribe");
  const snapshots: Partial<TestSettings>[] = [];

  const unsubscribe = store.subscribe((next) => snapshots.push(next));
  await store.set("theme", "dark");
  await store.set("volume", 42);
  unsubscribe();

  await store.set("theme", "light");

  const lastEmitted = snapshots[snapshots.length - 1];
  expect(lastEmitted).toEqual({ theme: "dark", volume: 42 });
  expect(snapshots).not.toContainEqual({ theme: "light", volume: 42 });
});

test("different dbNames keep settings isolated (reusable across apps)", async () => {
  const appA = await makeStore("app-a", { theme: "light" });
  const appB = await makeStore("app-b", { theme: "dark" });

  await appA.set("volume", 1);
  await appB.set("volume", 2);

  expect(await appA.get("volume")).toBe(1);
  expect(await appB.get("volume")).toBe(2);
  expect(await appA.get("theme")).toBe("light");
  expect(await appB.get("theme")).toBe("dark");
});
