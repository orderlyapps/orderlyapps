import { useState, useEffect, type ReactNode } from "react";
import { CongregationSelectModal } from "../congregation-select-modal/CongregationSelectModal.tsx";
import { OnboardingPublisherModal } from "../onboarding-publisher-modal/OnboardingPublisherModal.tsx";
import { hasSelectedCongregation } from "../../../utils/stored-congregation.ts";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";

interface CongregationGuardProps {
  renderPublisherSelect: (onPublisherSelected: (publisher: Publisher) => void) => ReactNode;
  renderPublisherSignIn: (publisher: Publisher) => ReactNode;
}

export function CongregationGuard({
  renderPublisherSelect,
  renderPublisherSignIn,
}: CongregationGuardProps) {
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
        renderPublisherSelect={renderPublisherSelect}
        renderPublisherSignIn={renderPublisherSignIn}
      />
    </>
  );
}
