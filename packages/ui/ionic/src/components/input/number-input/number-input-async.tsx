import { InputLayout } from "../../layout/input-layout/input-layout.tsx";
import { useIonAlert } from "@ionic/react";
import type { InputCustomEvent, InputChangeEventDetail } from "@ionic/react";
import type { ComponentProps, Ref } from "react";

type InputLayoutAsyncProps = ComponentProps<typeof InputLayout>;

export type NumberInputAsyncProps = Omit<InputLayoutAsyncProps, "type" | "inputmode"> & {
  ref?: Ref<HTMLIonInputElement>;
  /** Alert header text. Defaults to the input `label`. */
  alertHeader?: string;
  /** Confirm button text. Defaults to `"Save"`. */
  confirmText?: string;
  /** Cancel button text. Defaults to `"Cancel"`. */
  cancelText?: string;
};

/**
 * A number input that is read-only on the surface and opens an `IonAlert`
 * with a numeric text field when pressed. The chosen value is emitted via
 * `onIonChange`, matching the standard `IonInput` change contract.
 */
export function NumberInputAsync({
  ref,
  label,
  value,
  onIonChange,
  onClick,
  alertHeader,
  confirmText = "Save",
  cancelText = "Cancel",
  ...props
}: NumberInputAsyncProps) {
  const [present] = useIonAlert();

  const handlePress: NonNullable<InputLayoutAsyncProps["onClick"]> = (event) => {
    onClick?.(event);
    void present({
      header: alertHeader ?? (typeof label === "string" ? label : undefined),
      inputs: [
        {
          name: "value",
          type: "number",
          value: value ?? "",
        },
      ],
      buttons: [
        { text: cancelText, role: "cancel" },
        {
          text: confirmText,
          role: "confirm",
          handler: (data: { value?: string }) => {
            onIonChange?.({
              detail: { value: data.value ?? null },
            } as InputCustomEvent<InputChangeEventDetail>);
          },
        },
      ],
    });
  };

  return (
    <InputLayout
      ref={ref}
      type="number"
      inputmode="decimal"
      readonly
      value={value}
      label={label}
      onClick={handlePress}
      {...props}
    />
  );
}
