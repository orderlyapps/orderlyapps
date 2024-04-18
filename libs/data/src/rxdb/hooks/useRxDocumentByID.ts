import { useRxData } from '@data';

type Collections = 'publishers' | 'schedule';

export const useRxDocumentByID = (collection: Collections, id: string) => {
  const data: any = useRxData(collection, (collection) =>
    collection.findOne(id)
  );
  return { doc: data.result[0], data: data };
};
