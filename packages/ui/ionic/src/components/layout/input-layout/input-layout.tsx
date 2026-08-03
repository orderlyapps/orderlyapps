import { IonItem, IonInput } from "@ionic/react";
import type { ComponentProps, Ref } from "react";

type IonInputProps = ComponentProps<typeof IonInput>;

export type InputLayoutProps = IonInputProps & {
  ref?: Ref<HTMLIonInputElement>;
};

/**
 * Wraps an IonInput in an IonItem so that all default inputs in this package
 * share a single styling surface. Adjust layout/styling here only.
 */
export function InputLayout({ ref, ...props }: InputLayoutProps) {
  return (
    <IonItem style={{ maxWidth: "480px", marginInline: "auto", width: "100%" }}>
      <IonInput ref={ref} {...props} />
    </IonItem>
  );
}
