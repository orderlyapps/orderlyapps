import { useRxDocumentByID } from '@data';
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
import { usePublisher } from './hooks/usePublisher';
import { PublisherForm } from './components/PublisherForm';

export const EditPublisherModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const publisher: any = usePublisher.use.publisher();
  const { doc } = useRxDocumentByID('publishers', publisher.id);

  const update = async () => {
    await doc.update({
      $set: {
        familyHead: publisher?.id,
        ...publisher,
      },
    });
    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Publisher</IonTitle>
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
        <PublisherForm></PublisherForm>
      </IonContent>
    </IonModal>
  );
};

export default EditPublisherModal;
