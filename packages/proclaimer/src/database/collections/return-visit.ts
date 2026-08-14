import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";
import { rxdb } from "../rxdb/database.js";
import type { ReturnVisitLocal } from "../rxdb/collections/return-visit.js";

export const returnVisitCollection = createCollection(
  rxdbCollectionOptions<ReturnVisitLocal>({
    rxCollection: rxdb.return_visit,
    startSync: true,
  }),
);
