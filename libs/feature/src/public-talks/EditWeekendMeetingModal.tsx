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
import { TalkPicker } from './TalkPicker';

export const EditWeekendMeetingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IonButton onClick={() => setIsOpen(true)}>
        <strong>Edit</strong>
      </IonButton>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>EditWeekendMeetingModal</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TalkPicker></TalkPicker>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EditWeekendMeetingModal;
