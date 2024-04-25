import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { PublisherNameForm } from './components/PublisherNameForm';
import { supabase, useStore } from '@data';

export const EditPublisherNameModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { publisher } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  const update = async () => {
    const { data, error } = await supabase
      .from('publishers')
      .update(publisher)
      .eq('publisher_id', publisher.publisher_id)
      .select();

    const { data: publisherList } = await supabase
      .from('publishers')
      .select(`publisher_id, displayName, firstName, lastName, outlines`);

    setStoreProperty('publisherList', publisherList);

    setIsOpen(false);
  };

  return (
    <>
      <IonButton onClick={() => setIsOpen(true)}>
        <strong>Edit</strong>
      </IonButton>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Name</IonTitle>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={update}>
                <strong>Done</strong>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <PublisherNameForm></PublisherNameForm>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EditPublisherNameModal;
