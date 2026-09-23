import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import {
  VisitingSpeakersHeader,
  VisitingSpeakersContent,
} from "@amodeo/proclaimer/feature/speaker";

function VisitingSpeakersPage() {
  const [search, setSearch] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <VisitingSpeakersHeader search={search} on_search_change={setSearch} />
      </IonHeader>
      <IonContent className="ion-padding">
        <VisitingSpeakersContent search={search} />
      </IonContent>
    </IonPage>
  );
}

export default VisitingSpeakersPage;
