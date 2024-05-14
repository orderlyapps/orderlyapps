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
import { OutlinesForm } from './OutlinesForm';
import { useRXdb, useSettings, useStore } from '@data';
import { upsertPublisher } from '../_helper/upsertPublisher';
import { usePublishers } from '../_hooks/usePublishers';

export const UpdatePublisherOutlinesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { newOutlines } = useStore.use.store();
  const { congregation_id } = useSettings.use.settings();
  const rxdb = useRXdb.use.rxdb();
  const publisher: any = usePublishers.use.publisher();
  const setStoreProperty = useStore.use.setStoreProperty();

  const handleCancel = () => {
    setStoreProperty('newOutlines', [publisher.outlines]);
    setIsOpen(false);
  };

  const handleUpdate = async () => {
    const newPublisherList = await upsertPublisher(
      rxdb,
      { ...publisher, outlines: newOutlines },
      congregation_id
    );
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
          <OutlinesForm />
        </IonContent>
      </IonModal>
    </>
  );
};

export default UpdatePublisherOutlinesModal;
