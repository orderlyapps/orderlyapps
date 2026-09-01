import { useState, useEffect } from "react";
import { CongregationSelectModal } from "@amodeo/proclaimer/feature/congregation";
import { OnboardingPublisherModal } from "./onboarding-publisher-modal/OnboardingPublisherModal";
import { hasSelectedCongregation } from "@amodeo/proclaimer/feature/congregation";

export function CongregationGuard() {
  const [showCongregationModal, setShowCongregationModal] = useState(false);
  const [showPublisherModal, setShowPublisherModal] = useState(false);

  useEffect(() => {
    if (!hasSelectedCongregation()) {
      setShowCongregationModal(true);
    }
  }, []);

  const handleCongregationDismiss = () => {
    setShowCongregationModal(false);
    if (hasSelectedCongregation()) {
      setShowPublisherModal(true);
    }
  };

  return (
    <>
      <CongregationSelectModal
        isOpen={showCongregationModal}
        onDismiss={handleCongregationDismiss}
      />
      <OnboardingPublisherModal
        isOpen={showPublisherModal}
        onDismiss={() => setShowPublisherModal(false)}
      />
    </>
  );
}
