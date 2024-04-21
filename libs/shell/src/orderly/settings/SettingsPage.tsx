import { BuildTime, SupabaseAuth } from '@feature';
import {
  IonBackButton,
  IonButton,
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
          {import.meta.env.DEV && (
            <IonButton routerLink={path.TestPage} expand="full">
              TEST PAGE
            </IonButton>
          )}
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
