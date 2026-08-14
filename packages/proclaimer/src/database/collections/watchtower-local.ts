import type { WatchtowerLocal } from "../rxdb/collections/watchtower.js";
import { rxdb } from "../rxdb/database.js";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const watchtowerLocalCollection = createCollection(
  rxdbCollectionOptions<WatchtowerLocal>({
    rxCollection: rxdb.watchtower,
    startSync: true,
  }),
);
