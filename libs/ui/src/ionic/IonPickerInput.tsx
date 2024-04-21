import { useState } from 'react';
import { chevronExpand } from 'ionicons/icons';
import { IonIcon, IonItem, IonPickerLegacy, IonText } from '@ionic/react';

type IonPickerLegacyInput = {
  label: string;
  options: { text: string; value: any }[];
  onSelect: ({ text, value }: { text: string; value: any }) => any;
  disabled?: boolean;
  value: string;
};

export const IonPickerLegacyInput = ({
  label,
  options,
  onSelect,
  disabled,
  value,
}: IonPickerLegacyInput) => {
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
        <IonText slot="end" className="ion-padding-end">
          {value}
        </IonText>
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
              console.log("🚀 ~ value:", value)
              
              onSelect({ ...value.picker, name: label });
            },
          },
        ]}
      ></IonPickerLegacy>
    </>
  );
};

export default IonPickerLegacyInput;
