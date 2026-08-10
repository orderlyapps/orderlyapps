import type { SettingsMap } from "@amodeo/utils";

/**
 * Onboarding settings persisted via `app-settings`. The congregation is
 * stored as soon as the user enters the correct password; `onboardingComplete`
 * is only set after the optional publisher step (select or skip). Only the
 * congregation and publisher IDs are stored; names are resolved at runtime
 * from the corresponding records.
 */
export interface ProclaimerOnboardingSettings extends SettingsMap {
  congregationId: string;
  publisherId: string | null;
  onboardingComplete: boolean;
}
