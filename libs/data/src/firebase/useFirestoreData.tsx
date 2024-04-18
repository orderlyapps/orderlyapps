import { fdb } from '@data';
import { FirestoreDocuments, FirestoreCollections } from '@data';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useFirestoreData = ({
  collection,
  document,
}: {
  collection: FirestoreCollections;
  document: FirestoreDocuments;
}) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const unsub = onSnapshot(doc(fdb, collection, document), (doc) => {
      if (!doc.data()) {
        // return new Error();
      }
      setData(doc.data() as any);
    });
    return () => {
      unsub();
    };
  }, []);
  return data;
};

export default useFirestoreData;
