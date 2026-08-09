import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { PublisherName } from "../../../publisher-name/publisher-name.js";

export interface PublisherListItemProps {
  publisher: PublisherRecord;
}

export function PublisherListItem({ publisher }: PublisherListItemProps) {
  return (
    <IonItem>
      <IonLabel>
        <h2>
          <PublisherName
            publisher={publisher}
            format="first_name (display_name) middle_name last_name"
          />
        </h2>
        <p>{publisher.type}</p>
      </IonLabel>
      <IonNote slot="end">{publisher.standing}</IonNote>
    </IonItem>
  );
}
