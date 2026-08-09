import { IonItem, IonLabel, IonList, IonSpinner } from "@ionic/react";
import { usePublisher } from "../../hooks/use-publisher.js";
import { PublisherName } from "../publisher-name/publisher-name.js";
import { DetailRow } from "./components/detail-row/detail-row.js";

export interface PublisherDetailsProps {
  id: string | undefined;
}

export function PublisherDetails({ id }: PublisherDetailsProps) {
  const { data: publisher, isLoading, isError, isConfigured } = usePublisher(id);

  if (!isConfigured) {
    return (
      <IonList inset>
        <IonItem lines="none">
          <IonLabel color="medium">
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to load publishers
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  if (isLoading) {
    return (
      <div className="ion-padding ion-text-center">
        <IonSpinner />
      </div>
    );
  }

  if (isError || !publisher) {
    return (
      <IonList inset>
        <IonItem color="danger">
          <IonLabel>Publisher not found</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList inset>
      <IonItem lines="full">
        <IonLabel>
          <h2>
            <PublisherName
              publisher={publisher}
              format="first_name (display_name) middle_name last_name"
            />
          </h2>
        </IonLabel>
      </IonItem>
      <DetailRow label="First name" value={publisher.first_name} />
      <DetailRow label="Middle name" value={publisher.middle_name} />
      <DetailRow label="Last name" value={publisher.last_name} />
      <DetailRow label="Display name" value={publisher.display_name} />
      <DetailRow label="Standing" value={publisher.standing} />
      <DetailRow label="Type" value={publisher.type} />
      <DetailRow label="Gender" value={publisher.gender} />
      <DetailRow label="Congregation" value={publisher.congregation_id} />
      <DetailRow label="Family" value={publisher.family_id} />
      <DetailRow label="Group" value={publisher.group_id} />
      <DetailRow label="Auth" value={publisher.auth_id} />
      <DetailRow label="Archived at" value={publisher.archived_at} lines="none" />
    </IonList>
  );
}
