import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UpdatePublisherOutlines } from '../components/publisher/PublisherOutlinesForm';
import { supabase, useStore } from '@data';
import { usePublisher } from '../../publishers/hooks/usePublisher';

export const UpdatePublisherOutlinesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { publisher, newOutlines } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  const handleCancel = () => {
    setStoreProperty('newOutlines', [publisher.outlines]);
    setIsOpen(false);
  };

  const handleUpdate = async () => {
    const {
      data: [{ outlines }],
      error,
    }: any = await supabase
      .from('publishers')
      .update({ ...publisher, outlines: newOutlines })
      .eq('publisher_id', publisher.id)
      .select();

    setStoreProperty('publisher', { ...publisher, outlines });

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
            <IonTitle>Select Outlines</IonTitle>
            <IonButtons slot="start">
              <IonButton onClick={handleCancel}>Cancel</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={handleUpdate}>
                <strong>Update</strong>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <UpdatePublisherOutlines />
        </IonContent>
      </IonModal>
    </>
  );
};

export default UpdatePublisherOutlinesModal;
