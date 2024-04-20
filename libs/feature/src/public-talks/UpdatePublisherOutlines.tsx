import { IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { PUBLIC_TALK_THEMES } from '../schedules/public-talks/helper/publicTalkData';
import { checkmarkCircle } from 'ionicons/icons';
import { usePublisher } from '../publishers/hooks/usePublisher';

export const UpdatePublisherOutlines = () => {
  const { outlines }: any = usePublisher.use.publisher();
  const setPublisherProperty = usePublisher.use.setPublisherProperty();

  const handleRemoveOutline = (outline: string) => {
    setPublisherProperty(
      'outlines',
      outlines?.filter((o: string) => o !== outline) as string[]
    );
  };

  const handleAddOutline = (outline: string) => {
    setPublisherProperty('outlines', [outline, ...outlines].sort() as string[]);
  };

  return (
    <IonList>
      {PUBLIC_TALK_THEMES.map((outline) => {
        if (outlines?.includes(outline.number as never))
          return (
            <IonItem onClick={() => handleRemoveOutline(outline.number)}>
              <IonText slot="start">
                <strong>{outline.number}.</strong>
              </IonText>

              <IonText className="ion-padding-vertical">
                {outline.title}
              </IonText>

              <IonIcon icon={checkmarkCircle} color="primary" slot="end" />
            </IonItem>
          );
        return (
          <IonItem onClick={() => handleAddOutline(outline.number)}>
            <IonText slot="start">
              <strong>{outline.number}.</strong>
            </IonText>

            <IonText className="ion-padding-vertical">{outline.title}</IonText>

            <IonText color="primary" slot="end">
              <strong color="primary"></strong>
            </IonText>
          </IonItem>
        );
      })}
    </IonList>
  );
};
