import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonList,
} from "@ionic/react";
import { NavItem } from "@amodeo/proclaimer/ui/components/navigation/nav-item/NavItem";

function PdfsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/elder" />
          </IonButtons>
          <IonTitle>PDFs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <NavItem label="Contacts List" to="/home/elder/contacts-list" />
          <NavItem label="Groups" to="/home/elder/pdfs/groups" />
          <NavItem label="Midweek Meeting" to="/home/elder/clam" />
          <NavItem label="Weekend Meeting" to="/home/elder/pdfs/speaker-schedule" />
          <NavItem label="Audio Video" to="/home/elder/audio-video" />
          <NavItem label="Cleaning" to="/home/elder/cleaning-schedule" />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default PdfsPage;
