import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSpinner } from "@ionic/react";
import { ErrorItem } from "@amodeo/ionic";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { useCongregations } from "../../hooks/use-congregations.js";
import type { CongregationFilterNode } from "../../hooks/use-congregations.js";
import { CongregationListItem } from "./components/congregation-list-item/congregation-list-item.js";

export interface CongregationListProps {
  congregationRoutePrefix?: string;
  filter?: CongregationFilterNode | CongregationFilterNode[];
}

export function CongregationList({ congregationRoutePrefix, filter }: CongregationListProps = {}) {
  const {
    data: congregations,
    isLoading,
    isError,
    error,
    isConfigured,
  } = useCongregations({
    filter,
  });

  if (!isConfigured) {
    return (
      <IonList inset>
        <IonItem lines="none">
          <IonLabel color="medium">
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to load congregations
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
        <ErrorItem
          message={error ? describeSupabaseError(error) : "Failed to load congregations"}
        />
      </IonList>
    );
  }

  return (
    <IonList inset>
      <IonGrid>
        <IonRow>
          {congregations.map((congregation) => (
            <IonCol
              key={congregation.id}
              size="12"
              sizeMd="6"
              sizeXl="4"
              className="ion-no-padding"
            >
              <CongregationListItem
                congregation={congregation}
                routerLink={
                  congregationRoutePrefix
                    ? `${congregationRoutePrefix}/${congregation.id}`
                    : undefined
                }
              />
            </IonCol>
          ))}
          {congregations.length === 0 && (
            <IonCol size="12">
              <IonItem lines="none">
                <IonLabel color="medium">No congregations found</IonLabel>
              </IonItem>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </IonList>
  );
}
