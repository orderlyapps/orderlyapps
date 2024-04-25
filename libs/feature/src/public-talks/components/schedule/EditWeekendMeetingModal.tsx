import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { IonPickerModalInput } from '@ui';
import { formatDisplayName } from '../../../publishers/helper/formatDisplayName';
import { getOutline } from '../../helper/getOutline';
import { SelectSpeaker } from './SelectSpeaker';
import { useStore } from '@data';
import { SelectChairman } from '../../../schedules/SelectChairman';
import { SelectWatchtowerReader } from '../../../schedules/SelectWatchtowerReader';

export const EditWeekendMeetingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { schedule } = useStore.use.store();

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
          <IonList inset>
            <IonPickerModalInput
              content={SelectSpeaker}
              label="Speaker"
              value={formatDisplayName(schedule?.publicSpeaker) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>
            <IonPickerModalInput
              content={SelectSpeaker}
              label="Theme"
              value={getOutline(schedule?.outline) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>
            <IonPickerModalInput
              content={SelectChairman}
              label="Chairman"
              value={formatDisplayName(schedule?.weekendChairman) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>
            <IonPickerModalInput
              content={SelectWatchtowerReader}
              label="Reader"
              value={formatDisplayName(schedule?.watchtowerReader) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EditWeekendMeetingModal;
