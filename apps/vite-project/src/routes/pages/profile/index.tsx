import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function ProfileTabPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonAvatar slot="start" />
            <IonLabel>
              <h2>User Profile</h2>
              <p>Edit your account details here</p>
            </IonLabel>
          </IonItem>
          <IonItem routerLink="/profile/edit" detail>
            <IonLabel>Edit profile</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
