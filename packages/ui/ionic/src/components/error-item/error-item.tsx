import { IonItem, IonLabel } from "@ionic/react";

export interface ErrorItemProps {
  message: string;
}

/**
 * An inline danger-colored row for surfacing an error inside a list. This is
 * the pattern duplicated across proclaimer list views; centralizing it keeps
 * the styling consistent.
 */
export function ErrorItem({ message }: ErrorItemProps) {
  return (
    <IonItem color="danger">
      <IonLabel>{message}</IonLabel>
    </IonItem>
  );
}
