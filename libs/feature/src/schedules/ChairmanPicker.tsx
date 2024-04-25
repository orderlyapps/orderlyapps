import { IonPickerModalInput } from '@ui';
import { SelectChairman } from './SelectChairman';
import { formatDisplayName } from '../publishers/helper/formatDisplayName';
import { useStore } from '@data';

export const ChairmanPicker = () => {
  const { schedule } = useStore.use.store();
  console.log("🚀 ~ ChairmanPicker ~ schedule:", schedule)
  return (
    <IonPickerModalInput
      content={SelectChairman}
      label="Speaker"
      value={formatDisplayName(schedule?.weekendChairman) || ''}
      labelPlacement="floating"
    ></IonPickerModalInput>
  );
};
