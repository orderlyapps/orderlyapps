import { IonIcon, IonItem, IonList, IonText } from '@ionic/react';
import { PUBLIC_TALK_THEMES } from '../../helper/publicTalkData';
import { checkmarkCircle } from 'ionicons/icons';
import { sortOutlines } from '../../helper/sortOutlines';
import { OutlineItem } from '../OutlineItem';
import { useStore } from '@data';
import { useEffect } from 'react';

export const UpdatePublisherOutlines = () => {
  const { publisher, newOutlines } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  const handleRemoveOutline = (outline: string) => {
    setStoreProperty(
      'newOutlines',
      newOutlines?.filter((o: string) => o !== outline)
    );
  };

  const handleAddOutline = (outline: string) => {
    setStoreProperty(
      'newOutlines',
      [outline, ...(newOutlines || [])].sort(sortOutlines)
    );
  };
  useEffect(() => {
    setStoreProperty('newOutlines', publisher.outlines);
  }, []);

  return (
    <IonList>
      {PUBLIC_TALK_THEMES.map((outline, index) => {
        if (newOutlines?.includes(outline.number))
          return (
            <IonItem
              onClick={() => handleRemoveOutline(outline.number)}
              key={index}
              color={'light'}
            >
              <OutlineItem outline={outline}></OutlineItem>
              <IonIcon icon={checkmarkCircle} color="primary" slot="end" />
            </IonItem>
          );
        return (
          <IonItem onClick={() => handleAddOutline(outline.number)} key={index}>
            <OutlineItem outline={outline}></OutlineItem>
            <IonText color="primary" slot="end">
              <strong color="primary"></strong>
            </IonText>
          </IonItem>
        );
      })}
    </IonList>
  );
};
