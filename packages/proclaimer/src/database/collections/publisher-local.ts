import type { PublisherLocal } from "../rxdb/collections/publisher.js";
import { rxdb } from "../rxdb/database.js";
import { createCollection } from "@tanstack/react-db";
import { rxdbCollectionOptions } from "@tanstack/rxdb-db-collection";

export const publisherLocalCollection = createCollection(
  rxdbCollectionOptions<PublisherLocal>({
    rxCollection: rxdb.publisher,
    startSync: true,
  }),
);
