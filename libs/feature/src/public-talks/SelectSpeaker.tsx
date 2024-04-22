import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from '@ionic/react';
import { formatDisplayName } from '../publishers/helper/formatDisplayName';
import useSBPublishers from '../publishers/hooks/useSBPublishers';
import { PUBLIC_TALK_THEMES } from './helper/publicTalkData';
import { supabase, useStore } from '@data';
import { sortOutlines } from './helper/sortOutlines';

export const SelectSpeaker = ({ closeModal }: any) => {
  const publishers = useSBPublishers();

  const { week } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  const handleSelect = async (publisher: any, outline: string) => {
    const { data, error }: any = await supabase
      .from('schedule')
      .upsert({ week, publicSpeaker: publisher.id, outline })
      .select();
    console.log('🚀 ~ handleSelect ~ data:', data[0]);

    setStoreProperty('schedule', {
      publicSpeaker: publisher,
      outline: outline,
    });

    closeModal();
  };
  
  return (
    <IonAccordionGroup>
      {publishers.map(
        (publisher: {
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
            <IonAccordion key={publisher.id}>
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
