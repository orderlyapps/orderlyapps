import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { chevronExpand } from 'ionicons/icons';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
};

export const IonPickerModalInput = ({
  label,
  disabled,
  value,
  content: Content,
  lines,
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
        <IonLabel className="">{label}</IonLabel>
        <IonText slot="end" className="ion-padding-end ion-text-end">
          {value}
        </IonText>
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
