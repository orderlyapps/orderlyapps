import { PublisherList } from "@amodeo/proclaimer";
import { IonItem, IonLabel, IonList } from "@ionic/react";

export function HomeContent() {
  return (
    <>
      <IonList inset>
        <IonItem routerLink="/home/details" detail>
          <IonLabel>View details</IonLabel>
        </IonItem>
      </IonList>
      <PublisherList />
    </>
  );
}
