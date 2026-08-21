import type { ComponentProps } from "react";
import { IonButton, useIonAlert } from "@ionic/react";

type IonButtonProps = ComponentProps<typeof IonButton>;

export interface ConfirmButtonProps extends IonButtonProps {
  /** Alert header text. Defaults to `"Are you sure?"`. */
  header?: string;
  /** Alert body message shown beneath the header. */
  message?: string;
  /** Confirm button text. Defaults to `"Confirm"`. */
  confirmText?: string;
  /** Cancel button text. Defaults to `"Cancel"`. */
  cancelText?: string;
}

/**
 * An `IonButton` that presents an Ionic alert on click and only invokes
 * `onClick` after the user selects the confirm action. The underlying
 * `IonButton` props (e.g. `color`, `fill`, `disabled`) are forwarded, so a
 * destructive action can be styled with `color="danger"`.
 */
export function ConfirmButton({
  onClick,
  header = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  ...buttonProps
}: ConfirmButtonProps) {
  const [present] = useIonAlert();

  const handleClick: IonButtonProps["onClick"] = (event) => {
    void present({
      header,
      message,
      buttons: [
        { text: cancelText, role: "cancel" },
        { text: confirmText, role: "confirm", handler: () => onClick?.(event) },
      ],
    });
  };

  return <IonButton onClick={handleClick} {...buttonProps} />;
}
