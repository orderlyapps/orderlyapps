import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ReactNode, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

type PageProps = {
  children: ReactNode;
  label: string;
  backButtonText?: string;
};

export const Page = ({ children, label, backButtonText }: PageProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              {...(backButtonText && { text: backButtonText })}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{label}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>{children}</Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Page;
