import { IonicApp } from '@feature';
import { settingsOutline, homeOutline } from 'ionicons/icons';
import '@styles';
import { HomePage } from './HomePage';
import { Settings } from './SettingsPage';
import { useEffect, useState } from 'react';
import {
  PDFDowloadPage,
  PublisherDetailsPage,
  PublisherListPage,
  PublishersImportPage,
  WeekDetailsPage,
  WeeklyScheduleListPage,
} from '@feature';
import { initOrderlyDB, Provider, useRxDB } from '@data';

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
    component: WeeklyScheduleListPage,
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
    <Provider db={db}>
      <IonicApp content={content}></IonicApp>
    </Provider>
  );
};

export default Orderly;
