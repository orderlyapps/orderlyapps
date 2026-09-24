import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@amodeo/proclaimer/feature/territory";
import { MapLogDetailHeader } from "@amodeo/proclaimer/feature/map";
import { MapLogDetailContent } from "@amodeo/proclaimer/feature/map";
import type { MapRow } from "@amodeo/proclaimer/feature/territory";

interface MapLogDetailPageProps {
  match: {
    params: { map_id: string };
  };
}

function MapLogDetailPage({ match }: MapLogDetailPageProps) {
  const map_id = match.params.map_id;

  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const map_name = all_maps.find((m) => m.id === map_id)?.name ?? "Map";

  return (
    <IonPage>
      <IonHeader>
        <MapLogDetailHeader map_name={map_name} />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding ">
        <MapLogDetailContent map_id={map_id} />
      </IonContent>
    </IonPage>
  );
}

export default MapLogDetailPage;
