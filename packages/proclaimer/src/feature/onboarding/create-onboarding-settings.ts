import { createAppSettings, type AppDatabase } from "@amodeo/utils";
import type { ProclaimerOnboardingSettings } from "./types.js";

export interface CreateProclaimerOnboardingSettingsOptions {
  /**
   * RxDB database name for standalone mode. Required when `database` is not
   * provided. Use a unique name per app (e.g. `"proclaimer-onboarding"`).
   */
  dbName?: string;
  /**
   * Shared database from `createAppDatabase`. When provided, onboarding
   * settings are stored as an `"onboarding"` document within the shared
   * database, enabling unified export/import with other settings domains.
   * `dbName` is ignored.
   */
  database?: AppDatabase;
}

/** Document ID used by onboarding stores within a shared `AppDatabase`. */
const ONBOARDING_DOC_ID = "onboarding";

/**
 * Creates an `AppSettings<ProclaimerOnboardingSettings>` store backed by rxdb.
 * Call this once per app and pass the result to `OnboardingGuard`.
 *
 * In shared mode (passing `database`), onboarding settings share the same
 * database as other settings domains for unified export/import.
 */
export async function createProclaimerOnboardingSettings(
  options: CreateProclaimerOnboardingSettingsOptions,
) {
  return createAppSettings<ProclaimerOnboardingSettings>({
    database: options.database,
    dbName: options.dbName,
    docId: options.database ? ONBOARDING_DOC_ID : undefined,
  });
}
