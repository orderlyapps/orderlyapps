import { useState } from "react";
import { IonItem, IonLabel, IonList, IonSearchbar, IonSpinner } from "@ionic/react";
import { ErrorItem } from "@amodeo/ionic";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { useCongregations } from "../../../../../congregations/hooks/use-congregations.js";
import type { CongregationRecord } from "../../../../../congregations/congregation-schema.js";

export interface CongregationStepProps {
  onSelect: (congregation: CongregationRecord) => void;
}

export function CongregationStep({ onSelect }: CongregationStepProps) {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, isConfigured } = useCongregations();

  if (!isConfigured) {
    return (
      <IonList inset>
        <IonItem lines="none">
          <IonLabel color="medium">Configure Supabase to load congregations</IonLabel>
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

  const term = search.trim().toLowerCase();
  const filtered = term ? data.filter((c) => c.name.toLowerCase().includes(term)) : data;

  return (
    <>
      <IonSearchbar value={search} onIonInput={(e) => setSearch(e.detail.value ?? "")} />
      <IonList inset>
        {filtered.map((c) => (
          <IonItem key={c.id} button onClick={() => onSelect(c)} detail={false}>
            <IonLabel>{c.name}</IonLabel>
          </IonItem>
        ))}
        {filtered.length === 0 && (
          <IonItem lines="none">
            <IonLabel color="medium">No congregations found</IonLabel>
          </IonItem>
        )}
      </IonList>
    </>
  );
}
