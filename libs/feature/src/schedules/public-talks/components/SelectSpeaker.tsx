import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from '@ionic/react';
import { useWeek } from '../../_hooks/useWeek';
import { PUBLIC_TALK_THEMES } from '../_helper/publicTalkData';
import { sortOutlines } from '../_helper/sortOutlines';
import { usePublishers } from '../../../publishers/_hooks/usePublishers';
import formatDisplayName from '../../../publishers/name/formatDisplayName';

export const SelectSpeaker = ({ closeModal }: any) => {
  const publishers = usePublishers.use.publishers();
  const setWeekProperties = useWeek.use.setWeekProperties();

  const handleSelect = async ({ publisher_id }: any, outline: string) => {
    setWeekProperties({ publicSpeaker_id: publisher_id, outline });
    closeModal();
  };

  return (
    <IonAccordionGroup>
      {publishers.map(
        (publisher: {
          publisher_id: string;
          id: any;
          displayName: string;
          firstName: string;
          lastName: string;
          outlines: [];
        }) => {
          if (!publisher.outlines || publisher.outlines.length === 0) {
            return null;
          }
          return (
            <IonAccordion key={publisher.publisher_id}>
              <IonItem slot="header" color="light">
                <IonLabel>{formatDisplayName(publisher)}</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonList>
                  {publisher.outlines.sort(sortOutlines).map((outline) => {
                    return (
                      <IonItem
                        key={outline}
                        onClick={() => handleSelect(publisher, outline)}
                      >
                        <IonText slot="start">
                          <strong>{outline}</strong>
                        </IonText>
                        {
                          PUBLIC_TALK_THEMES?.find(
                            (talk) => talk.number === outline
                          )?.title
                        }
                      </IonItem>
                    );
                  })}
                </IonList>
              </div>
            </IonAccordion>
          );
        }
      )}
    </IonAccordionGroup>
  );
};
