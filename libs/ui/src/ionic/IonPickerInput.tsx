import { useState } from 'react';
import { chevronExpand } from 'ionicons/icons';
import { IonIcon, IonItem, IonPicker, IonText } from '@ionic/react';

type IonPickerInput = {
  label: string;
  options: { text: string; value: any }[];
  onSelect: ({ text, value }: { text: string; value: any }) => any;
  disabled?: boolean;
  value: string;
};

export const IonPickerInput = ({
  label,
  options,
  onSelect,
  disabled,
  value,
}: IonPickerInput) => {
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
      <IonPicker
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
      ></IonPicker>
    </>
  );
};

export default IonPickerInput;
