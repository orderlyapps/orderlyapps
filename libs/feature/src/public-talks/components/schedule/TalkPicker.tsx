import { IonPickerModalInput } from '@ui';
import { SelectSpeaker } from './SelectSpeaker';
import { IonList } from '@ionic/react';
import { getOutline } from '../../helper/getOutline';
import { formatDisplayName } from '../../../publishers/helper/formatDisplayName';
import { useStore } from '@data';

export const TalkPicker = () => {
  const { schedule } = useStore.use.store();

  return (
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
    </IonList>
  );
};

export default TalkPicker