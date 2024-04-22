import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense } from 'react';
import { WeekendMeetingPDFDownloadButton } from './WeekendMeetingPDFDownloadButton';

export const PDFDowloadPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>PDF Dowload Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <div className="full centered">
            <WeekendMeetingPDFDownloadButton></WeekendMeetingPDFDownloadButton>
          </div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PDFDowloadPage;
