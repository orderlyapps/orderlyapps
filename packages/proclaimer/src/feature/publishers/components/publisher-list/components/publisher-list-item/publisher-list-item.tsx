import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { PublisherRecord } from "../../../../publisher-schema.js";

export interface PublisherListItemProps {
  publisher: PublisherRecord;
}

export function PublisherListItem({ publisher }: PublisherListItemProps) {
  const name = publisher.display_name ?? `${publisher.first_name} ${publisher.last_name}`;

  return (
    <IonItem>
      <IonLabel>
        <h2>{name}</h2>
        <p>{publisher.type}</p>
      </IonLabel>
      <IonNote slot="end">{publisher.standing}</IonNote>
    </IonItem>
  );
}
