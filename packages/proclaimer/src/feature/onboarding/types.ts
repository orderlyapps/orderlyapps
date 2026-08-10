import type { SettingsMap } from "@amodeo/utils";

/**
 * Onboarding settings persisted via `app-settings`. The congregation is
 * stored as soon as the user enters the correct password; `onboardingComplete`
 * is only set after the optional publisher step (select or skip).
 */
export interface ProclaimerOnboardingSettings extends SettingsMap {
  congregationId: string;
  congregationName: string;
  publisherId: string | null;
  publisherName: string | null;
  onboardingComplete: boolean;
}
