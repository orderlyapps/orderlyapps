import type { SettingsLocal } from "../../../database/rxdb/collections/settings.js";
import { rxdb } from "../../../database/rxdb/database.js";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const settingsLocalCollection = createCollection(
  rxdbCollectionOptions<SettingsLocal>({
    rxCollection: rxdb.settings,
    startSync: true,
  }),
);
