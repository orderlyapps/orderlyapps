import { CongregationForm, TalkPicker } from '@feature';
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

export const TestPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Create Congregation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <TalkPicker></TalkPicker>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default TestPage;
