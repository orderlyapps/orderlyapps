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
import { Suspense } from 'react';
import { BuildTime, CongregationCreateModal, SupabaseAuth } from '@feature';
import CongregationSelectModal from '../congregation/modals/CongregationSelectModal';
import CongregationClaimModal from '../congregation/modals/CongregationClaimModal';
import CongregationYieldModal from '../congregation/modals/CongregationYieldModal';

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
          <CongregationSelectModal></CongregationSelectModal>
          <CongregationClaimModal></CongregationClaimModal>
          <CongregationYieldModal></CongregationYieldModal>

          <CongregationCreateModal></CongregationCreateModal>
          {import.meta.env.DEV && (
            <IonButton
              routerLink={'/settings/create-congregation/'}
              expand="full"
            >
              TEST PAGE
            </IonButton>
          )}
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
