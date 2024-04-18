import React from 'react';
import { createRoot } from 'react-dom/client';
import { Orderly } from '@shell';
import './main.css';
import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration-schema';

if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin);
}

addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationPlugin);


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Orderly />
  </React.StrictMode>
);
