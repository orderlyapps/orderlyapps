import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Spinner } from '@ui';
import { Suspense, lazy, useEffect, useState } from 'react';
import { supabase, useStore } from '@data';
import { formatDate } from '@util';
const WeekendMeetingDetails = lazy(
  () => import('../../public-talks/components/schedule/WeekendMeetingDetails')
);

export const WeekDetailsPage = ({ match }: any) => {
  const setStoreProperty = useStore.use.setStoreProperty();

  useEffect(() => {
    const getData = async () => {
      let { data }: any = await supabase
        .from('schedule')
        .select(
          `outline, 
            publicSpeaker:publicSpeaker_id (displayName, firstName, lastName) ,
            watchtowerReader:watchtowerReader_id (displayName, firstName, lastName) ,
            weekendChairman:weekendChairman_id (displayName, firstName, lastName) 
            `
        )
        .eq('week_id', match.params.id)
        .single();

      setStoreProperty('schedule', {
        week_id: match.params.id,
        publicSpeaker: data?.publicSpeaker || '',
        weekendChairman: data?.weekendChairman || '',
        watchtowerReader: data?.watchtowerReader || '',
        outline: data?.outline || '',
      });
    };

    getData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>
            {formatDate(parseInt(match.params.id)).theocraticWeek}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <WeekendMeetingDetails></WeekendMeetingDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default WeekDetailsPage;
