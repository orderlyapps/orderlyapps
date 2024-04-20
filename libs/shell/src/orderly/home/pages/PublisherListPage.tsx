import { SBPublishersList } from '@feature';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { Spinner } from '@ui';
import { Suspense, useState } from 'react';
import AddPublisherModal from '../modals/AddPublisherModal';

export const PublisherListPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={'Home'}></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Publishers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <SBPublishersList reQuery={isOpen}></SBPublishersList>

          <AddPublisherModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></AddPublisherModal>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherListPage;
