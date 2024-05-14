import { settingsOutline, homeOutline } from 'ionicons/icons';
import '@styles';
import { useEffect, useState } from 'react';
import { HomePage } from './home/HomePage';
import { Settings } from './settings/SettingsPage';
import { initOrderlyDB, RXDBProvider, useRXdb } from '@data';
import IonShell from '../components/IonShell';
import {
  PublisherListPage,
  PublisherDetailsPage,
  PublishersImportPage,
  WeekListPage,
  WeekDetailsPage,
  PDFDowloadPage,
  TestPage,
  CongregationListPage,
  CongregationsDetailsPage,
  EventsListPage,
  EventDetailsPage,
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

  // PUBLISHERS
  {
    label: 'PublisherListPage',
    component: PublisherListPage,
    path: '/home/publisher',
    redirect: true,
  },
  {
    label: 'PublisherDetailsPage',
    component: PublisherDetailsPage,
    path: '/home/publisher/details/:publisher_id',
    redirect: true,
  },
  {
    label: 'PublishersImportPage',
    component: PublishersImportPage,
    path: '/home/publisher/import',
    redirect: true,
  },

  // SCHEDULE
  {
    label: 'WeeklyScheduleListPage',
    component: WeekListPage,
    path: '/home/schedule',
    redirect: true,
  },
  {
    label: 'WeekDetailsPage',
    component: WeekDetailsPage,
    path: '/home/schedule/details/:week_id',
    redirect: true,
  },

  // PDF
  {
    label: 'PDFDowloadPage',
    component: PDFDowloadPage,
    path: '/home/schedule/pdf-download/',
    redirect: true,
  },

  // CONGREGATION
  {
    label: 'CongregationListPage',
    component: CongregationListPage,
    path: '/home/congregations/',
    redirect: true,
  },
  {
    label: 'CongregationsDetailsPage',
    component: CongregationsDetailsPage,
    path: '/home/congregations/details/:id/:test1/:test2',
    redirect: true,
  },

  // EVENTS
  {
    label: 'EventsListPage',
    component: EventsListPage,
    path: '/home/events/',
    redirect: true,
  },
  {
    label: 'EventDetailsPage',
    component: EventDetailsPage,
    path: '/home/events/details/:id',
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
  const initRXorderlyDB = useRXdb.use.initRXorderlyDB();

  useEffect(() => {
    const onStartup = async () => {
      initRXorderlyDB();
    };

    onStartup();
  }, []);

  return <IonShell content={content}></IonShell>;
};

export default Orderly;
