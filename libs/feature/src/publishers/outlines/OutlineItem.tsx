import { IonText } from '@ionic/react';

export const OutlineItem = ({
  outline,
}: {
  outline: { number: string; title: string };
}) => {
  return (
    <IonText className="ion-text-wrap ion-padding-xxx">
      <strong>No. {outline.number}.</strong>
      <br />
      {outline.title}
    </IonText>
  );
};
