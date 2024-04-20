import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense } from 'react';
import { path } from '../Orderly';

export const HomePage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <IonList inset>
            <IonButton routerLink={path.PublisherListPage} expand="block">
              Publishers
            </IonButton>

            <IonButton routerLink={path.PublishersImportPage} expand="block">
              Import Publishers
            </IonButton>

            <IonButton routerLink={path.WeeklyScheduleListPage} expand="block">
              Weekly Schedule
            </IonButton>

            <IonButton routerLink={path.PDFDowloadPage} expand="block">
              PDF Download
            </IonButton>
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
