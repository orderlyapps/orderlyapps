import { createContext, useContext } from "react";
import type { AppSettings } from "@amodeo/utils";
import type { ProclaimerOnboardingSettings } from "./types.js";

/**
 * Provides the onboarding `AppSettings` store to descendants of
 * `OnboardingGuard`. This lets components rendered after onboarding
 * (e.g. a reset button on the settings page) access the store without
 * prop drilling through route components.
 */
export const OnboardingSettingsContext = createContext<
  AppSettings<ProclaimerOnboardingSettings> | undefined
>(undefined);

/**
 * Returns the onboarding settings store from the nearest `OnboardingGuard`.
 * Throws if used outside of one.
 */
export function useOnboardingSettings(): AppSettings<ProclaimerOnboardingSettings> {
  const store = useContext(OnboardingSettingsContext);
  if (!store) {
    throw new Error("useOnboardingSettings must be used within an OnboardingGuard.");
  }
  return store;
}
