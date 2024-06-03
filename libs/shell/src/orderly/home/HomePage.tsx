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
            <IonButton
              routerLink={path.PublisherListPage}
              expand="block"
              className="ion-padding"
            >
              Publishers List
            </IonButton>

            <IonButton
              routerLink={path.CongregationsPage}
              expand="block"
              className="ion-padding"
            >
              Congregations
            </IonButton>

            <IonButton
              routerLink={path.WeeklyScheduleListPage}
              expand="block"
              className="ion-padding"
            >
              Weekly Schedule
            </IonButton>

            <IonButton
              routerLink={path.EventsListPage}
              expand="block"
              className="ion-padding"
            >
              Events List
            </IonButton>

            <IonButton
              routerLink={path.PDFDowloadPage}
              expand="block"
              className="ion-padding"
            >
              PDF Download
            </IonButton>

            {/* <IonButton routerLink={path.PublishersImportPage} expand="block" className='ion-padding'>
              Import Publishers
            </IonButton> */}
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
