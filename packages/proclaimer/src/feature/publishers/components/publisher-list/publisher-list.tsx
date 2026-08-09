import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSpinner } from "@ionic/react";
import { usePublishers } from "../../hooks/use-publishers.js";
import type { PublisherFilterNode } from "../../hooks/use-publishers.js";
import { PublisherListItem } from "./components/publisher-list-item/publisher-list-item.js";

export interface PublisherListProps {
  publisherRoutePrefix?: string;
  filter?: PublisherFilterNode | PublisherFilterNode[];
}

export function PublisherList({ publisherRoutePrefix, filter }: PublisherListProps = {}) {
  const { data: publishers, isLoading, isError, isConfigured } = usePublishers({ filter });

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

  if (isError) {
    return (
      <IonList inset>
        <IonItem color="danger">
          <IonLabel>Failed to load publishers</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList inset>
      <IonGrid>
        <IonRow>
          {publishers.map((publisher) => (
            <IonCol key={publisher.id} size="12" sizeMd="6" sizeXl="4" className="ion-no-padding">
              <PublisherListItem
                publisher={publisher}
                routerLink={
                  publisherRoutePrefix ? `${publisherRoutePrefix}/${publisher.id}` : undefined
                }
              />
            </IonCol>
          ))}
          {publishers.length === 0 && (
            <IonCol size="12">
              <IonItem lines="none">
                <IonLabel color="medium">No publishers found</IonLabel>
              </IonItem>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonList>
  );
}
