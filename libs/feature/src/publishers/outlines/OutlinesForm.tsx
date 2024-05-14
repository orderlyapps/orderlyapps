import { IonIcon, IonItem, IonList, IonText } from '@ionic/react';
import { PUBLIC_TALK_THEMES } from '../../schedules/public-talks/_helper/publicTalkData';
import { checkmarkCircle } from 'ionicons/icons';
import { sortOutlines } from '../../schedules/public-talks/_helper/sortOutlines';
import { OutlineItem } from './OutlineItem';
import { useStore } from '@data';
import { useEffect } from 'react';
import {usePublishers} from '../_hooks/usePublishers';

export const OutlinesForm = () => {
  const { newOutlines } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();
  const publisher = usePublishers.use.publisher();

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
