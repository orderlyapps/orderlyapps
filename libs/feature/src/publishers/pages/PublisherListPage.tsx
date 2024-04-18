import { PublishersList } from '@feature';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { Spinner } from '@ui';
import { Suspense, useState } from 'react';
import AddPublisherModal from '../modals/AddPublisherModal';
import SBase from '../../tools/components/supabase';
import { SupabaseAuth } from '../../user/Auth';

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
          <SupabaseAuth></SupabaseAuth>
          {/* <SBase></SBase>
          <PublishersList></PublishersList>

          <AddPublisherModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></AddPublisherModal> */}
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherListPage;
