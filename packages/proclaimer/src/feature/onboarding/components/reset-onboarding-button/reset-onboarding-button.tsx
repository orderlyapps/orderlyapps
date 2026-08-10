import { ConfirmButton } from "@amodeo/ionic";
import { useOnboardingSettings } from "../../onboarding-settings-context.js";

export interface ResetOnboardingButtonProps {
  /** Button text. Defaults to `"Reset onboarding"`. */
  children?: string;
}

/**
 * A destructive button that clears all stored onboarding settings after the
 * user confirms. Once cleared, `OnboardingGuard` re-renders and shows the
 * `OnboardingFlow` again, letting the user re-run onboarding from scratch.
 *
 * Must be rendered inside an `OnboardingGuard`.
 */
export function ResetOnboardingButton({
  children = "Reset onboarding",
}: ResetOnboardingButtonProps) {
  const settings = useOnboardingSettings();

  return (
    <ConfirmButton
      expand="block"
      fill="clear"
      color="danger"
      header="Reset onboarding?"
      message="This will clear your congregation and publisher selection so you can run onboarding again."
      confirmText="Reset"
      onConfirm={() => void settings.clear()}
    >
      {children}
    </ConfirmButton>
  );
}
