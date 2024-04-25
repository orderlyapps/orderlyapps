import { supabase, useStore } from '@data';
import { IonItem, IonLabel } from '@ionic/react';
import formatDisplayName from '../publishers/helper/formatDisplayName';

export const SelectChairman = ({ closeModal }: any) => {
  const { publisherList, schedule } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  const handelSelect = async (p: any) => {
    const { data, error } = await supabase
      .from('schedule')
      .upsert({
        week_id: schedule.week_id,
        congregation_id: schedule.congregation_id,
        weekendChairman_id: p.publisher_id,
      })
      .select()
      .single();
    if (error) console.log(error.message);
    setStoreProperty('schedule', {
      ...schedule,
      weekendChairman: p,
    });

    closeModal();
  };
  return (
    <>
      {publisherList.map(
        (p: {
          publisher_id: any;
          displayName: string;
          firstName: string;
          lastName: string;
        }) => {
          return (
            <IonItem key={p.publisher_id} onClick={() => handelSelect(p)}>
              <IonLabel>{formatDisplayName(p)}</IonLabel>
            </IonItem>
          );
        }
      )}
    </>
  );
};
