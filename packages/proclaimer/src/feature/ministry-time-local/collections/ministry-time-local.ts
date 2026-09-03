import type { MinistryTimeLocal } from "../../../database/rxdb/collections/ministry-time.js";
import { rxdb } from "../../../database/rxdb/database.js";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const ministryTimeLocalCollection = createCollection(
  rxdbCollectionOptions<MinistryTimeLocal>({
    rxCollection: rxdb.ministry_time,
    startSync: true,
  }),
);
