import { supabase, useStore } from '@data';
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
import { PublisherNameForm } from './components/PublisherNameForm';

export const AddPublisherModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { publisher } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  const handleAdd = async () => {
    const { data, error } = await supabase
      .from('publishers')
      .upsert({ ...publisher, publisher_id: crypto.randomUUID() })
      .select();

    const { data: publisherList } = await supabase
      .from('publishers')
      .select(`publisher_id, displayName, firstName, lastName, outlines`);

    setStoreProperty('publisherList', publisherList);

    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Publisher</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleAdd}>
              <strong>Add</strong>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PublisherNameForm></PublisherNameForm>
      </IonContent>
    </IonModal>
  );
};

export default AddPublisherModal;
