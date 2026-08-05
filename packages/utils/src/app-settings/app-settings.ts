import {
  addRxPlugin,
  createRxDatabase,
  type RxCollection,
  type RxDatabase,
  type RxStorage,
} from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";

import type { AppSettings, CreateAppSettingsOptions, SettingsMap } from "./types.ts";

const SETTINGS_DOC_ID = "app-settings";
const COLLECTION_NAME = "settings";

type SettingsDoc = { id: string; data: SettingsMap };
type SettingsDatabase = RxDatabase<{
  [COLLECTION_NAME]: RxCollection<SettingsDoc>;
}>;

let devModeAdded = false;

function isDev(): boolean {
  // Vite/browser: import.meta.env.DEV
  if (typeof import.meta !== "undefined" && (import.meta as any).env?.DEV) return true;
  // Node/SSR: process.env.NODE_ENV
  if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") return true;
  return false;
}

function ensureDevMode(): void {
  if (devModeAdded) return;
  if (isDev()) addRxPlugin(RxDBDevModePlugin);
  devModeAdded = true;
}

/** Wraps storage with ajv validation in dev-mode (required by RxDBDevModePlugin). */
function resolveStorage(base: RxStorage<any, any>): RxStorage<any, any> {
  return isDev() ? wrappedValidateAjvStorage({ storage: base }) : base;
}

function shallowEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

export async function createAppSettings<T extends SettingsMap>(
  options: CreateAppSettingsOptions<T>,
): Promise<AppSettings<T>> {
  const { dbName, defaults, storage } = options;
  ensureDevMode();

  const baseStorage = storage ?? getRxStorageDexie();
  const db = await createRxDatabase<SettingsDatabase>({
    name: dbName,
    storage: resolveStorage(baseStorage),
    // Reuse an existing connection when the same dbName is opened twice
    // (e.g. HMR, React StrictMode double-mount). Same dbName = same store.
    closeDuplicates: true,
  });

  await db.addCollections({
    [COLLECTION_NAME]: {
      schema: {
        version: 0,
        primaryKey: "id",
        type: "object",
        properties: {
          id: { type: "string", maxLength: 100 },
          data: { type: "object", additionalProperties: true },
        },
        required: ["id", "data"],
      },
    },
  });

  const collection = db[COLLECTION_NAME];

  async function getDoc(): Promise<SettingsMap> {
    const doc = await collection.findOne(SETTINGS_DOC_ID).exec();
    return (doc?.data ?? {}) as SettingsMap;
  }

  let writeQueue: Promise<void> = Promise.resolve();

  async function patchData(mutate: (current: SettingsMap) => SettingsMap): Promise<void> {
    const result = writeQueue.then(async () => {
      const doc = await collection.findOne(SETTINGS_DOC_ID).exec();
      if (!doc) {
        await collection.insert({ id: SETTINGS_DOC_ID, data: mutate({}) });
        return;
      }
      const current = { ...doc.data } as SettingsMap;
      const next = mutate(current);
      await doc.incrementalPatch({ data: next });
    });
    writeQueue = result.catch((err: unknown) => {
      console.error("[app-settings] write failed:", err);
    });
    return result;
  }

  // Seed defaults for any missing keys without overwriting stored values.
  if (defaults) {
    const current = await getDoc();
    const merged = { ...defaults, ...current } as SettingsMap;
    if (!shallowEqual(current as Record<string, unknown>, merged as Record<string, unknown>)) {
      await patchData(() => merged);
    }
  }

  return {
    async get<K extends keyof T & string>(key: K): Promise<T[K] | undefined> {
      const data = await getDoc();
      return data[key] as T[K] | undefined;
    },
    async getAll(): Promise<Partial<T>> {
      return (await getDoc()) as Partial<T>;
    },
    async set<K extends keyof T & string>(key: K, value: T[K]): Promise<void> {
      await patchData((current) => ({ ...current, [key]: value }));
    },
    async setMany(values: Partial<T>): Promise<void> {
      await patchData((current) => ({ ...current, ...values }));
    },
    async remove<K extends keyof T & string>(key: K): Promise<void> {
      await patchData((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    },
    async clear(): Promise<void> {
      await patchData(() => ({}));
    },
    async replaceAll(values: Partial<T>): Promise<void> {
      await patchData(() => ({ ...values }) as SettingsMap);
    },
    subscribe(listener) {
      const sub = collection.findOne(SETTINGS_DOC_ID).$.subscribe((doc) => {
        listener((doc?.data ?? {}) as Partial<T>);
      });
      return () => sub.unsubscribe();
    },
    async close(): Promise<void> {
      await db.close();
    },
  };
}
