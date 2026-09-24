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

function ServiceOverseerPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Service Overseer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <NavItem label="Map" to="/home/service-overseer/map" />
          <NavItem label="Records" to="/home/service-overseer/map-log" />
          <NavItem label="Tags" to="/home/service-overseer/map-tags" />
          <NavItem label="PDFs" to="/home/service-overseer/pdfs" />
          {/* <NavItem label="Auto Checkout" to="/home/service-overseer/map-checkout" /> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default ServiceOverseerPage;
