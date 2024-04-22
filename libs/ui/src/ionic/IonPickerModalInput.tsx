import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { chevronExpand } from 'ionicons/icons';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

type IonPickerModalInput = {
  label: string;
  disabled?: boolean;
  value: string | number | null;
  content: (closeModal: { closeModal: () => void }) => ReactNode;
  lines?: any;
  labelPlacement?: 'fixed' | 'stacked' | 'floating';
};

export const IonPickerModalInput = ({
  label,
  disabled,
  value,
  content: Content,
  lines,
  labelPlacement = 'fixed',
}: IonPickerModalInput) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IonItem
        button
        detail={false}
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        lines={lines}
      >
        <IonInput
          label={label}
          labelPlacement={labelPlacement}
          value={value}
        ></IonInput>

        <IonIcon
          slot="end"
          size="small"
          icon={chevronExpand}
          className="pl-1"
        ></IonIcon>
      </IonItem>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{label}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Content closeModal={() => setIsOpen(false)}></Content>
        </IonContent>
      </IonModal>
    </>
  );
};

export default IonPickerModalInput;
