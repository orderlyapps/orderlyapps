import { useIonToast } from "@ionic/react";
import { getErrorMessage } from "@amodeo/utils";

export interface UseErrorToastOptions {
  /** Translates a thrown value into a user-facing message. */
  describeError?: (error: unknown) => string;
  /** How long the toast stays visible, in ms. Defaults to 4000. */
  duration?: number;
}

export interface UseErrorToastResult {
  presentError: (error: unknown) => void;
}

const DEFAULT_DURATION = 4000;

/**
 * Presents a danger-colored toast describing a thrown value. The default
 * describer is `getErrorMessage` from `@amodeo/utils`; pass `describeError`
 * (e.g. `describeSupabaseError`) for domain-specific mapping.
 */
export function useErrorToast(options: UseErrorToastOptions = {}): UseErrorToastResult {
  const [present] = useIonToast();
  const { describeError = getErrorMessage, duration = DEFAULT_DURATION } = options;

  const presentError = (error: unknown) => {
    void present({
      message: describeError(error),
      color: "danger",
      duration,
    });
  };

  return { presentError };
}
