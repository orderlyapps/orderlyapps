import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useState } from "react";
import { Publishers } from "@amodeo/proclaimer/feature/publisher";
import { SearchInput } from "@amodeo/proclaimer/ui/components/inputs/search/SearchInput";

function PublishersPage() {
  const [search_term, setSearchTerm] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/secretary" />
          </IonButtons>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <SearchInput value={search_term} on_change={setSearchTerm} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Publishers base_path="/home/secretary/publishers" search_term={search_term} />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
