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
import { buildTime } from '@util';
import { Suspense } from 'react';

export const Settings = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <div className="full centered">
            Build Time: {buildTime.timeDifference}
          </div>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
