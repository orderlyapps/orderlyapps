import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { PublisherName } from "../../../publisher-name/publisher-name.js";

export interface PublisherSelectItemProps {
  publisher: PublisherRecord;
  selected: boolean;
  onSelect: (publisher: PublisherRecord) => void;
}

export function PublisherSelectItem({ publisher, selected, onSelect }: PublisherSelectItemProps) {
  return (
    <IonItem button onClick={() => onSelect(publisher)} detail={false}>
      <IonLabel>
        <h2>
          <PublisherName
            publisher={publisher}
            format="first_name (display_name) middle_name last_name"
          />
        </h2>
        <p>{publisher.type}</p>
      </IonLabel>
      {selected && (
        <IonNote slot="end">
          <IonIcon icon={checkmark} color="primary" />
        </IonNote>
      )}
    </IonItem>
  );
}
