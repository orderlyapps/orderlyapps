import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
  IonNote,
  IonLabel,
} from '@ionic/react';

// TODO: Convert Autocomplee to Async component so that its otpions can be dynamic

const HelpText = ({ showHelpText }: { showHelpText: boolean }) => {
  if (!showHelpText) return null;
  return <IonItem>Start typing...</IonItem>;
};

export const Autocomplete = ({
  onSelect,
  onInputChange,
  onCancel,
  ...props
}: any) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            onIonInput={(e) => onInputChange(e.detail.value)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonList id="modal-list" inset={true}>
          <HelpText showHelpText={props.items.length === 0}></HelpText>
          {props.items.map((item: any) => (
            <IonItem key={item.value.place_name} onClick={() => onSelect(item)}>
              <IonLabel>
                {item.text}
                <IonNote style={{ display: 'block' }}>
                  {item.value.place_name.substring(
                    item.value.place_name.indexOf(', ') + 1
                  )}
                </IonNote>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};
export default Autocomplete;
