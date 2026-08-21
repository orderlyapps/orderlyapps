import { useState } from "react";
import { IonItem, IonLabel, IonList, IonSearchbar, IonSpinner } from "@ionic/react";
import { ErrorItem } from "@amodeo/ionic";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { usePublishers } from "../../../../hooks/use-publishers.js";
import type { PublisherFilterNode, PublisherOrderBy } from "../../../../hooks/use-publishers.js";
import type { PublisherRecord } from "../../../../publisher-schema.js";
import { formatPublisherName } from "../../../publisher-name/publisher-name.js";
import { PublisherSelectItem } from "../publisher-select-item/publisher-select-item.js";

export interface PublisherSelectListProps {
  selectedId?: string | null;
  filter?: PublisherFilterNode | PublisherFilterNode[];
  orderBy?: PublisherOrderBy[];
  onSelect: (publisher: PublisherRecord) => void;
}

export function PublisherSelectList({
  selectedId,
  filter,
  orderBy,
  onSelect,
}: PublisherSelectListProps) {
  const [search, setSearch] = useState("");
  const {
    data: publishers,
    isLoading,
    isError,
    error,
    isConfigured,
  } = usePublishers({
    filter,
    orderBy,
  });

  if (!isConfigured) {
    return (
      <IonList>
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
      <IonList>
        <ErrorItem message={error ? describeSupabaseError(error) : "Failed to load publishers"} />
      </IonList>
    );
  }

  const term = search.trim().toLowerCase();
  const filtered = term
    ? publishers.filter((p) => formatPublisherName(p).toLowerCase().includes(term))
    : publishers;

  return (
    <>
      <IonSearchbar value={search} onIonInput={(e) => setSearch(e.detail.value ?? "")} />
      <IonList>
        {filtered.map((publisher) => (
          <PublisherSelectItem
            key={publisher.id}
            publisher={publisher}
            selected={publisher.id === selectedId}
            onSelect={onSelect}
          />
        ))}
        {filtered.length === 0 && (
          <IonItem lines="none">
            <IonLabel color="medium">No publishers found</IonLabel>
          </IonItem>
        )}
      </IonList>
    </>
  );
}
