import { supabase, useSettings, useStore } from '@data';
import { IonItem, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';

export const CongregationList = () => {
  const [congregations, setCongregations] = useState<any[] | null>([]);
  const { congregation } = useStore.use.store();
  const { congregation_id } = useSettings.use.settings();

  useEffect(() => {
    const getCongregations = async () => {
      let { data: congregations, error } = await supabase
        .from('congregations')
        .select();
      setCongregations(congregations);
    };
    getCongregations();
  }, []);

  return (
    <IonList>
      {congregations?.map((c) => {
        return (
          <IonItem
            key={c.congregation_id}
            routerLink={
              '/home/congregations/details/' + c.congregation_id + '/1/2'
            }
            color={congregation_id === c.congregation_id ? 'primary' : 'light'}
          >
            {c.name}
          </IonItem>
        );
      })}
    </IonList>
  );
};
