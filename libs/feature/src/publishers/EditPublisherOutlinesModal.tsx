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

export const EditPublisherOutlinesModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>EditPublisherOutlinesModal</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
       EditPublisherOutlinesModal
      </IonContent>
    </IonModal>
  );
};

export default EditPublisherOutlinesModal;
