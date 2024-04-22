import { supabase, useRxDB } from '@data';
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
import { PublisherForm } from './components/PublisherForm';
import { usePublisher } from './hooks/usePublisher';

export const AddPublisherModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const publisher = usePublisher.use.publisher();
  const db: any = useRxDB();

  const handleAdd = async () => {
    // await db.publishers.insert({
    //   ...publisher,
    //   id: crypto.randomUUID(),
    // });

    const { data, error } = await supabase
      .from('publishers')
      .upsert({
        id: crypto.randomUUID(),
        // firstName: publisher.firstName,
        // lastName: publisher.lastName,
        // displayName: publisher.displayName,
        // middleName: publisher.middleName,
      })
      .select();
    console.log('🚀 ~ handleAdd ~ data:', data);
    console.log('🚀 ~ handleAdd ~ error:', error);

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
        <PublisherForm></PublisherForm>
      </IonContent>
    </IonModal>
  );
};

export default AddPublisherModal;
