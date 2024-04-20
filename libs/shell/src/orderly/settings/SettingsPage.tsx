import { BuildTime, SupabaseAuth } from '@feature';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { buildTime } from '@util';
import { Suspense } from 'react';
import { path } from '../Orderly';
import CreateCongregationModal from './modals/CreateCongregationModal';

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
      <IonContent color={'light'}>
        <Suspense fallback={<Spinner></Spinner>}>
          <SupabaseAuth></SupabaseAuth>
          <BuildTime></BuildTime>

          <CreateCongregationModal></CreateCongregationModal>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
