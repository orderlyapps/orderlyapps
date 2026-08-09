import { IonItem, IonInput, IonText } from "@ionic/react";
import type { ComponentProps, Ref } from "react";

type IonInputProps = ComponentProps<typeof IonInput>;

export type InputLayoutProps = IonInputProps & {
  ref?: Ref<HTMLIonInputElement>;
};

/**
 * Wraps an IonInput in an IonItem so that all default inputs in this package
 * share a single styling surface. Adjust layout/styling here only.
 */
export function InputLayout({ ref, label, ...props }: InputLayoutProps) {
  return (
    <IonItem>
      <IonInput ref={ref} {...props} labelPlacement="floating">
        <IonText slot="label" color="primary" style={{ fontWeight: "bold" }}>
          {label}
        </IonText>
      </IonInput>
    </IonItem>
  );
}
