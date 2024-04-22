import { IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { PUBLIC_TALK_THEMES } from '../helper/publicTalkData';
import { checkmarkCircle } from 'ionicons/icons';
import { usePublisher } from '../../publishers/hooks/usePublisher';
import { sortOutlines } from '../helper/sortOutlines';
import { OutlineItem } from './OutlineItem';

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
    setPublisherProperty(
      'outlines',
      [outline, ...(outlines || [])].sort(sortOutlines) as string[]
    );
  };

  return (
    <IonList>
      {PUBLIC_TALK_THEMES.map((outline, index) => {
        if (outlines?.includes(outline.number as never))
          return (
            <IonItem
              onClick={() => handleRemoveOutline(outline.number)}
              key={index}
              color={'light'}
            >
              <OutlineItem
                number={outline.number}
                title={outline.title}
              ></OutlineItem>

              <IonIcon icon={checkmarkCircle} color="primary" slot="end" />
            </IonItem>
          );
        return (
          <IonItem onClick={() => handleAddOutline(outline.number)} key={index}>
            <OutlineItem
              number={outline.number}
              title={outline.title}
            ></OutlineItem>

            <IonText color="primary" slot="end">
              <strong color="primary"></strong>
            </IonText>
          </IonItem>
        );
      })}
    </IonList>
  );
};
