import type { RxStorage } from "rxdb/plugins/core";

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * A map of setting keys to their JSON-serialisable values.
 * Each app extends this with its own settings shape, e.g.
 *
 * ```ts
 * interface MyAppSettings extends SettingsMap {
 *   theme: "light" | "dark";
 *   notifications: boolean;
 *   volume: number;
 * }
 * ```
 */
export type SettingsMap = Record<string, JsonValue>;

export interface AppSettings<T extends SettingsMap> {
  /** Resolves a single setting value, or `undefined` if not stored. */
  get<K extends keyof T & string>(key: K): Promise<T[K] | undefined>;
  /** Resolves a snapshot of all currently stored settings. */
  getAll(): Promise<Partial<T>>;
  /** Writes a single setting, creating the underlying record if needed. */
  set<K extends keyof T & string>(key: K, value: T[K]): Promise<void>;
  /** Writes multiple settings in a single operation. */
  setMany(values: Partial<T>): Promise<void>;
  /** Removes a single setting key. */
  remove<K extends keyof T & string>(key: K): Promise<void>;
  /** Removes every stored setting. */
  clear(): Promise<void>;
  /** Atomically replaces all stored settings with the given values. */
  replaceAll(values: Partial<T>): Promise<void>;
  /** Subscribes to live updates of the full settings snapshot. Returns an unsubscribe function. */
  subscribe(listener: (settings: Partial<T>) => void): () => void;
  /** Closes the underlying RxDB database and releases resources. */
  close(): Promise<void>;
}

export interface CreateAppSettingsOptions<T extends SettingsMap> {
  /** RxDB database name. Use a unique name per app (e.g. `"subbie-settings"`). */
  dbName: string;
  /** Optional default values inserted on first init for any missing keys. */
  defaults?: Partial<T>;
  /**
   * Optional RxDB storage factory. Defaults to IndexedDB (via `getRxStorageDexie`)
   * which is suitable for browser/PWA apps. Pass a different storage (e.g.
   * `getRxStorageMemory()`) for tests or non-browser runtimes.
   */
  storage?: RxStorage<any, any>;
}

export type { RxStorage };
