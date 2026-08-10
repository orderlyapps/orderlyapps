import type { ReactNode } from "react";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useAppSettings, type AppSettings } from "@amodeo/utils";
import type { ProclaimerOnboardingSettings } from "../../types.js";
import { OnboardingFlow } from "../onboarding-flow/onboarding-flow.js";
import { OnboardingSettingsContext } from "../../onboarding-settings-context.js";
import { CongregationIdContext } from "../../../congregations/congregations-collection/congregation-id-context.js";

export interface OnboardingGuardProps {
  settings: AppSettings<ProclaimerOnboardingSettings>;
  children: ReactNode;
}

export function OnboardingGuard({ settings, children }: OnboardingGuardProps) {
  const { settings: values, ready } = useAppSettings(settings);

  if (!ready) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <IonSpinner />
        </IonContent>
      </IonPage>
    );
  }

  // `congregationId` is undefined until the user selects a congregation during
  // onboarding. The context scopes the congregations collection query so only
  // root congregations (congregation_id is null) are shown before selection,
  // and root + the user's congregation's children are shown after.
  const congregationId = values.congregationId || undefined;

  return (
    <OnboardingSettingsContext.Provider value={settings}>
      <CongregationIdContext.Provider value={congregationId}>
        {values.onboardingComplete ? children : <OnboardingFlow settings={settings} />}
      </CongregationIdContext.Provider>
    </OnboardingSettingsContext.Provider>
  );
}
