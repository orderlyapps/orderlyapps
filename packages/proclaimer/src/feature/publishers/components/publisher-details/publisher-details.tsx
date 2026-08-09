import { IonItem, IonLabel, IonList, IonSpinner } from "@ionic/react";
import { usePublisher } from "../../hooks/use-publisher.js";
import { DetailRow } from "./components/detail-row/detail-row.js";
import { FamilyDetailRow } from "./components/family-detail-row/family-detail-row.js";
import { NameDetailRow } from "./components/name-detail-row/name-detail-row.js";

export interface PublisherDetailsProps {
  id: string | undefined;
  publisherRoutePrefix?: string;
}

export function PublisherDetails({ id, publisherRoutePrefix }: PublisherDetailsProps) {
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
      <NameDetailRow publisher={publisher} />
      <DetailRow label="First name" value={publisher.first_name} />
      <DetailRow label="Middle name" value={publisher.middle_name} />
      <DetailRow label="Last name" value={publisher.last_name} />
      <DetailRow label="Display name" value={publisher.display_name} />
      <DetailRow label="Standing" value={publisher.standing} />
      <DetailRow label="Type" value={publisher.type} />
      <DetailRow label="Gender" value={publisher.gender} />
      <DetailRow label="Congregation" value={publisher.congregation_id} />
      <FamilyDetailRow publisher={publisher} publisherRoutePrefix={publisherRoutePrefix} />
      <DetailRow label="Group" value={publisher.group_id} />
      <DetailRow label="Auth" value={publisher.auth_id} />
      <DetailRow label="Archived at" value={publisher.archived_at} lines="none" />
    </IonList>
  );
}
