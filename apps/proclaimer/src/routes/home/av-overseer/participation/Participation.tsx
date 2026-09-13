import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonList,
} from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";
import { avParticipationTypeLabels, avParticipationTypes } from "@amodeo/proclaimer/feature/av";

function ParticipationPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/av-overseer" />
          </IonButtons>
          <IonTitle>Participation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {avParticipationTypes.map((type) => (
            <NavItem
              key={type}
              label={avParticipationTypeLabels[type]}
              to={`/home/av-overseer/participation/${type}`}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default ParticipationPage;
