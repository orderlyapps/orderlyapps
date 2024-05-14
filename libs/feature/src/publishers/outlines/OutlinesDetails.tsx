import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader
} from '@ionic/react';
import { usePublishers } from '../_hooks/usePublishers';
import UpdatePublisherOutlinesModal from './OutlinesEditModal';
import { OutlineItem } from './OutlineItem';
import { getOutline } from '../../schedules/public-talks/_helper/getOutline';
import { sortOutlines } from '../../schedules/public-talks/_helper/sortOutlines';

export const OutlinesDetails = () => {
  const { outlines } = usePublishers.use.publisher();

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Outlines</IonLabel>
          <UpdatePublisherOutlinesModal></UpdatePublisherOutlinesModal>
        </IonListHeader>
        {outlines &&
          outlines?.sort(sortOutlines).map((outline: string) => {
            return (
              <IonItem key={outline}>
                <OutlineItem
                  outline={{
                    number: outline,
                    title: getOutline(outline) as string,
                  }}
                ></OutlineItem>
              </IonItem>
            );
          })}
      </IonList>
    </>
  );
};
