import type { PublisherLocal } from "../schemas/publisher-local.js";
import { rxdb } from "../../../database/rxdb/database.js";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const publisherLocalCollection = createCollection(
  rxdbCollectionOptions<PublisherLocal>({
    rxCollection: rxdb.publisher,
    startSync: true,
  }),
);
