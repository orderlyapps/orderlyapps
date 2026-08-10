import { useState } from "react";
import { IonButton, IonItem, IonLabel, IonList, IonSearchbar, IonSpinner } from "@ionic/react";
import { ErrorItem } from "@amodeo/ionic";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { usePublishers } from "../../../../../publishers/hooks/use-publishers.js";
import type { PublisherRecord } from "../../../../../publishers/publisher-schema.js";
import { formatPublisherName } from "../../../../../publishers/components/publisher-name/publisher-name.js";

export interface PublisherStepProps {
  congregationId: string;
  onSelect: (publisher: PublisherRecord) => void;
  onSkip: () => void;
}

export function PublisherStep({ congregationId, onSelect, onSkip }: PublisherStepProps) {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, isConfigured } = usePublishers({
    filter: { column: "congregation_id", op: "eq", value: congregationId },
  });

  if (!isConfigured) {
    return (
      <IonList inset>
        <IonItem lines="none">
          <IonLabel color="medium">Configure Supabase to load publishers</IonLabel>
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

  if (isError) {
    return (
      <IonList inset>
        <ErrorItem message={error ? describeSupabaseError(error) : "Failed to load publishers"} />
      </IonList>
    );
  }

  const term = search.trim().toLowerCase();
  const filtered = term
    ? data.filter((p) => formatPublisherName(p).toLowerCase().includes(term))
    : data;

  return (
    <>
      <IonSearchbar value={search} onIonInput={(e) => setSearch(e.detail.value ?? "")} />
      <IonList inset>
        {filtered.map((p) => (
          <IonItem key={p.id} button onClick={() => onSelect(p)} detail={false}>
            <IonLabel>
              <h2>{formatPublisherName(p)}</h2>
              <p>{p.type}</p>
            </IonLabel>
          </IonItem>
        ))}
        {filtered.length === 0 && (
          <IonItem lines="none">
            <IonLabel color="medium">No publishers found</IonLabel>
          </IonItem>
        )}
      </IonList>
      <div className="ion-padding">
        <IonButton expand="block" fill="clear" onClick={onSkip}>
          Skip
        </IonButton>
      </div>
    </>
  );
}
