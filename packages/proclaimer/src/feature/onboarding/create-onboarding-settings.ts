import { createAppSettings } from "@amodeo/utils";
import type { ProclaimerOnboardingSettings } from "./types.js";

export interface CreateProclaimerOnboardingSettingsOptions {
  /** RxDB database name. Use a unique name per app (e.g. `"proclaimer-onboarding"`). */
  dbName: string;
}

/**
 * Creates an `AppSettings<ProclaimerOnboardingSettings>` store backed by rxdb.
 * Call this once per app and pass the result to `OnboardingGuard`.
 */
export async function createProclaimerOnboardingSettings(
  options: CreateProclaimerOnboardingSettingsOptions,
) {
  return createAppSettings<ProclaimerOnboardingSettings>({
    dbName: options.dbName,
  });
}
