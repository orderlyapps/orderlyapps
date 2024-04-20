import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import { UpdatePublisherOutlines } from './UpdatePublisherOutlines';
import { supabase } from '@data';
import { usePublisher } from '../publishers/hooks/usePublisher';

export const UpdatePublisherOutlinesModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const publisher = usePublisher.use.publisher();
  const setPublisher = usePublisher.use.setPublisher();

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('publishers')
      .update(publisher)
      .eq('id', publisher.id)
      .select();

    setIsOpen(false);
  };
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Outlines</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
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
  );
};

export default UpdatePublisherOutlinesModal;
