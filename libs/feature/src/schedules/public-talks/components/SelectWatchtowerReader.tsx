import { supabase, useStore } from '@data';
import { IonItem, IonLabel } from '@ionic/react';
import { useWeek } from '../../_hooks/useWeek';
import formatDisplayName from '../../../publishers/name/formatDisplayName';
import { usePublishers } from '../../../publishers/_hooks/usePublishers';
export const SelectWatchtowerReader = ({ closeModal }: any) => {
  const publishers = usePublishers.use.publishers();
  const setWeekProperties = useWeek.use.setWeekProperties();

  const handleSelect = async (publisher_id: any) => {
    setWeekProperties({ watchtowerReader_id: publisher_id });
    closeModal();
  };

  return (
    <>
      {publishers.map(
        (p: {
          publisher_id: any;
          displayName: string;
          firstName: string;
          lastName: string;
        }) => {
          return (
            <IonItem
              key={p.publisher_id}
              onClick={() => handleSelect(p.publisher_id)}
            >
              <IonLabel>{formatDisplayName(p)}</IonLabel>
            </IonItem>
          );
        }
      )}
    </>
  );
};
