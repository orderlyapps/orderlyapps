import { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useAppSettings, type AppSettings } from "@amodeo/utils";
import type { CongregationRecord } from "../../../congregations/congregation-schema.js";
import type { PublisherRecord } from "../../../publishers/publisher-schema.js";
import type { ProclaimerOnboardingSettings } from "../../types.js";
import { CongregationStep } from "./components/congregation-step/congregation-step.js";
import { PasswordStep } from "./components/password-step/password-step.js";
import { PublisherStep } from "./components/publisher-step/publisher-step.js";

type Step = "congregation" | "password" | "publisher";

export interface OnboardingFlowProps {
  settings: AppSettings<ProclaimerOnboardingSettings>;
}

export function OnboardingFlow({ settings }: OnboardingFlowProps) {
  const [step, setStep] = useState<Step>("congregation");
  const [congregation, setCongregation] = useState<CongregationRecord | null>(null);
  const { setMany } = useAppSettings(settings);

  const handleCongregationSelect = (c: CongregationRecord) => {
    setCongregation(c);
    setStep("password");
  };

  const handlePasswordSuccess = async () => {
    if (!congregation) return;
    await setMany({ congregationId: congregation.id });
    setStep("publisher");
  };

  const handlePublisherSelect = async (p: PublisherRecord) => {
    await setMany({ publisherId: p.id, onboardingComplete: true });
  };

  const handleSkip = async () => {
    await setMany({ publisherId: null, onboardingComplete: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {step === "congregation" && <CongregationStep onSelect={handleCongregationSelect} />}
        {step === "password" && congregation && (
          <PasswordStep
            congregation={congregation}
            onSuccess={handlePasswordSuccess}
            onBack={() => setStep("congregation")}
          />
        )}
        {step === "publisher" && congregation && (
          <PublisherStep
            congregationId={congregation.id}
            onSelect={handlePublisherSelect}
            onSkip={handleSkip}
          />
        )}
      </IonContent>
    </IonPage>
  );
}
