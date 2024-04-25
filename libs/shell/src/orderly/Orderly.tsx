import { settingsOutline, homeOutline } from 'ionicons/icons';
import '@styles';
import { useEffect, useState } from 'react';
import { HomePage } from './home/HomePage';
import { Settings } from './settings/SettingsPage';
import { initOrderlyDB, RXDBProvider } from '@data';
import IonShell from '../components/IonShell';
import {
  PublisherListPage,
  PublisherDetailsPage,
  PublishersImportPage,
  WeekListPage,
  WeekDetailsPage,
  PDFDowloadPage,
  TestPage,
} from '@feature';

const content = [
  // HOME
  {
    label: 'Home',
    component: HomePage,
    isTab: true,
    icon: homeOutline,
    path: '/home',
    redirect: true,
  },
  {
    label: 'PublisherListPage',
    component: PublisherListPage,
    path: '/home/publisher',
    redirect: true,
  },
  {
    label: 'PublisherDetailsPage',
    component: PublisherDetailsPage,
    path: '/home/publisher/details/:id',
    redirect: true,
  },
  {
    label: 'PublishersImportPage',
    component: PublishersImportPage,
    path: '/home/publisher/import',
    redirect: true,
  },
  {
    label: 'WeeklyScheduleListPage',
    component: WeekListPage,
    path: '/home/schedule',
    redirect: true,
  },
  {
    label: 'WeekDetailsPage',
    component: WeekDetailsPage,
    path: '/home/schedule/details/:id',
    redirect: true,
  },
  {
    label: 'PDFDowloadPage',
    component: PDFDowloadPage,
    path: '/home/schedule/pdf-download/',
    redirect: true,
  },

  // SETTINGS
  {
    label: 'Settings',
    component: Settings,
    isTab: true,
    icon: settingsOutline,
    path: '/settings',
  },
  {
    label: 'TestPage',
    component: TestPage,
    path: '/settings/create-congregation/',
    redirect: true,
  },
];

export const path = content.reduce((acc, current) => {
  acc[current.label] = current.path;
  return acc;
}, {} as { [key: string]: string });

export const Orderly: React.FC = () => {
  const [db, setDb] = useState<any>();

  useEffect(() => {
    initOrderlyDB().then(setDb);
  }, []);

  return (
      <RXDBProvider db={db}>
        <IonShell content={content}></IonShell>
      </RXDBProvider>
  );
};

export default Orderly;
