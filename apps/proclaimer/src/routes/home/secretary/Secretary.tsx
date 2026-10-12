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
import { ImportPublisherDataButton } from "@amodeo/proclaimer/feature/publisher-local";
import { Space } from "@amodeo/proclaimer/ui/components/layout/space/Space";

function SecretaryPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Secretary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <NavItem label="Publishers" to="/home/secretary/publishers" />
          <NavItem label="Regular Pioneers" to="/home/secretary/pioneers" />
          <NavItem label="Auxiliary Pioneers" to="/home/secretary/auxiliary-pioneers" />
          <NavItem label="Groups" to="/home/secretary/groups" />
          <NavItem label="Reactivated Publishers" to="/home/secretary/reactivated-publishers" />
          <NavItem label="Branch Report" to="/home/secretary/branch-report" />
          <NavItem label="CO Visit Info" to="/home/secretary/co-visit-info" />
          <NavItem label="Missing Details" to="/home/secretary/missing-details" />
          <NavItem label="Reports" to="/home/secretary/reports" />
        </IonList>
        <Space />
        <ImportPublisherDataButton />
      </IonContent>
    </IonPage>
  );
}

export default SecretaryPage;
