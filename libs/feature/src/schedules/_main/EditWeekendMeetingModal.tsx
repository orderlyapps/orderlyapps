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
import { formatDisplayName } from '../../publishers/name/formatDisplayName';
import { SelectChairman } from '../public-talks/components/SelectChairman';
import { SelectWatchtowerReader } from '../public-talks/components/SelectWatchtowerReader';
import { useWeek } from '../_hooks/useWeek';
import { SelectSpeaker } from '../public-talks/components/SelectSpeaker';
import { getOutline } from '../public-talks/_helper/getOutline';

export const EditWeekendMeetingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const week = useWeek.use.week();

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
              value={formatDisplayName(week?.publicSpeaker) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>

            <IonPickerModalInput
              content={SelectSpeaker}
              label="Theme"
              value={getOutline(week?.outline) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>

            <IonPickerModalInput
              content={SelectChairman}
              label="Chairman"
              value={formatDisplayName(week?.weekendChairman) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>

            <IonPickerModalInput
              content={SelectWatchtowerReader}
              label="Reader"
              value={formatDisplayName(week?.watchtowerReader) || ''}
              labelPlacement="floating"
            ></IonPickerModalInput>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default EditWeekendMeetingModal;
