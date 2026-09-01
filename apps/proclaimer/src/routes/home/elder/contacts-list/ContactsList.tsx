import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { DownloadContactsPdfButton } from "@amodeo/proclaimer/feature/publisher-local";

function ContactsListPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/elder/pdfs" />
          </IonButtons>
          <IonTitle>Contacts List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <DownloadContactsPdfButton />
      </IonContent>
    </IonPage>
  );
}

export default ContactsListPage;
