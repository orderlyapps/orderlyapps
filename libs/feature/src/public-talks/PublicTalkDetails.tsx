import { supabase, useStore } from '@data';
import {
  IonItem,
  IonLabel
} from '@ionic/react';
import { useEffect } from 'react';
import { formatDisplayName } from '../publishers/helper/formatDisplayName';
import { getOutline } from './helper/getOutline';

export const PublicTalkDetails = () => {
  const { week, schedule } = useStore.use.store();
  const setStoreProperty = useStore.use.setStoreProperty();

  useEffect(() => {
    const getData = async () => {
      let { data }: any = await supabase
        .from('schedule')
        .select(`outline, publishers (displayName, firstName, lastName)`)
        .eq('week', week);

      setStoreProperty('schedule', {
        publicSpeaker: data[0]?.publishers || '',
        outline: data[0]?.outline || '',
      });
    };

    getData();
  }, []);

  return (
    <>
      <IonItem>
        <IonLabel>Speaker</IonLabel>
        {formatDisplayName(schedule?.publicSpeaker, 'displayName lastName')}
      </IonItem>
      <IonItem>
        <IonLabel>Theme</IonLabel>
        {getOutline(schedule?.outline)}
      </IonItem>
    </>
  );
};
