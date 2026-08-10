import type { ReactNode } from "react";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useAppSettings, type AppSettings } from "@amodeo/utils";
import type { ProclaimerOnboardingSettings } from "../../types.js";
import { OnboardingFlow } from "../onboarding-flow/onboarding-flow.js";

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

  if (values.onboardingComplete) return <>{children}</>;

  return <OnboardingFlow settings={settings} />;
}
