import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import type { PublisherRecord } from "../../../../../../database/schemas/publisher.js";
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
          <PublisherName publisher={publisher} format="last_name, display_name" />
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
