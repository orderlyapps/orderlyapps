import { useState } from 'react';
import { chevronExpand } from 'ionicons/icons';
import { IonIcon, IonItem, IonPicker, IonPickerLegacy, IonText } from '@ionic/react';

type PickerProps = {
  label: string;
  options: { text: string; value: any }[];
  onSelect: ({ text, value }: { text: string; value: any }) => any;
  disabled?: boolean;
  value: string;
};

export const Picker = ({
  label,
  options,
  onSelect,
  disabled,
  value,
}: PickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IonItem
        button
        detail={false}
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      >
        {label}
        <IonText slot="end">{value}</IonText>
        <IonIcon
          slot="end"
          size="small"
          icon={chevronExpand}
          className="pl-1"
        ></IonIcon>
      </IonItem>
      <IonPickerLegacy
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        columns={[
          {
            name: 'picker',
            options: options,
          },
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Select',
            handler: (value) => {
              onSelect(value.picker);
            },
          },
        ]}
      ></IonPickerLegacy>
    </>
  );
};

export default Picker;
