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
import path from 'path';
import { Suspense } from 'react';
import CongregationClaimModal from '../modals/CongregationClaimModal';
import CongregationCreateModal from '../modals/CongregationCreateModal';
import CongregationSelectModal from '../modals/CongregationSelectModal';
import CongregationYieldModal from '../modals/CongregationYieldModal';
import CongregationEditModal from '../modals/CongregationEditModal';

export const CongregationsPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>CongregationsPage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <IonList inset>
            <IonButton
              routerLink={'/home/congregations/list'}
              expand="block"
              className="ion-padding"
            >
              Congregations List
            </IonButton>
            <CongregationSelectModal></CongregationSelectModal>
            <CongregationClaimModal></CongregationClaimModal>
            <CongregationYieldModal></CongregationYieldModal>
            <CongregationCreateModal></CongregationCreateModal>
          </IonList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default CongregationsPage;
