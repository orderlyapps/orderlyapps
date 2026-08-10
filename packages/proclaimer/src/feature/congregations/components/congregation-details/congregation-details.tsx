import { IonItem, IonLabel, IonList, IonSpinner } from "@ionic/react";
import { ErrorItem } from "@amodeo/ionic";
import { describeSupabaseError } from "@amodeo/utils/supabase";
import { useCongregation } from "../../hooks/use-congregation.js";
import { DetailRow } from "./components/detail-row/detail-row.js";
import { NameDetailRow } from "./components/name-detail-row/name-detail-row.js";
import { ParentCongregationDetailRow } from "./components/parent-congregation-detail-row/parent-congregation-detail-row.js";

export interface CongregationDetailsProps {
  id: string | undefined;
  congregationRoutePrefix?: string;
}

export function CongregationDetails({ id, congregationRoutePrefix }: CongregationDetailsProps) {
  const { data: congregation, isLoading, isError, error, isConfigured } = useCongregation(id);

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
        <ErrorItem message={error ? describeSupabaseError(error) : "Failed to load congregation"} />
      </IonList>
    );
  }

  if (!congregation) {
    return (
      <IonList inset>
        <ErrorItem message="Congregation not found" />
      </IonList>
    );
  }

  return (
    <IonList inset>
      <NameDetailRow congregation={congregation} />
      <ParentCongregationDetailRow
        congregation={congregation}
        congregationRoutePrefix={congregationRoutePrefix}
      />
      <DetailRow label="Password" value={congregation.password} lines="none" />
    </IonList>
  );
}
