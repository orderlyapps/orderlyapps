import { useRxData } from '@data';

export const useRxAllDocuments = (name: string) => {
  return useRxData(
    // the collection to be queried
    name,
    // a function returning the query to be applied
    (collection) => collection.find()
  );
};
