import { IonItem, IonSelect, IonText } from "@ionic/react";
import type { ComponentProps, Ref } from "react";

type IonSelectProps = ComponentProps<typeof IonSelect>;

export type SelectLayoutProps = IonSelectProps & {
  ref?: Ref<HTMLIonSelectElement>;
};

/**
 * Wraps an IonSelect in an IonItem so that all default selects in this package
 * share a single styling surface. Adjust layout/styling here only.
 */
export function SelectLayout({ ref, label, children, ...props }: SelectLayoutProps) {
  return (
    <IonItem>
      <IonSelect ref={ref} labelPlacement="floating" {...props}>
        <IonText slot="label" color="primary" style={{ fontWeight: "bold" }}>
          {label}
        </IonText>
        {children}
      </IonSelect>
    </IonItem>
  );
}
