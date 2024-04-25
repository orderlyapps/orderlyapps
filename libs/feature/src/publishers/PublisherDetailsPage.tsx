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
import { RouteComponentProps } from 'react-router-dom';
import { formatDisplayName } from './helper/formatDisplayName';
import { supabase, useStore } from '@data';
import { PublisherOutlinesList } from '../public-talks/components/publisher/PublisherOutlinesList';
const EditPublisherModal = lazy(() => import('./EditPublisherNameÏModal'));
const PublisherNameDetails = lazy(
  () => import('./components/PublisherNameDetails')
);

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const PublisherDetailsPage = ({ match }: UserDetailPageProps) => {
  const setStoreProperty = useStore.use.setStoreProperty();
  const { publisher } = useStore.use.store();

  useEffect(() => {
    const getPublisher = async () => {
      let {
        data: [publisher],
        error,
      }: any = await supabase
        .from('publishers')
        .select()
        .eq('publisher_id', match.params.id);
      if (error) console.log(error.message);
      setStoreProperty('publisher', { ...publisher });
    };
    getPublisher();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={'Publishers'}></IonBackButton>
          </IonButtons>
          <IonTitle>{formatDisplayName(publisher)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<Spinner></Spinner>}>
          <PublisherNameDetails></PublisherNameDetails>
          <PublisherOutlinesList></PublisherOutlinesList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherDetailsPage;
