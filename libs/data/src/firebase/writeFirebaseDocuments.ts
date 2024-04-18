import { DocumentData, doc, runTransaction } from 'firebase/firestore';
import { FirestoreCollections, FirestoreDocuments, fdb } from '@data';

type Arguments = {
  collection: FirestoreCollections;
  document: FirestoreDocuments;
  data: ({
    existingData,
    documentExists,
  }: {
    existingData: DocumentData | undefined;
    documentExists: boolean;
  }) => DocumentData | undefined;
};

export const writeFirebaseDoc = async ({
  collection,
  document,
  data,
}: Arguments) => {
  const documentRef = doc(fdb, collection + '/' + document);
  try {
    const writtenData: any = await runTransaction(fdb, async (transaction) => {
      const document = await transaction.get(documentRef);

      const newData = data({
        existingData: document.exists() ? document.data() : {},
        documentExists: document.exists(),
      });

      transaction.set(documentRef, newData);
      return newData;
    });
    return writtenData;
  } catch (e: any) {
    console.error(e.message);
    return e;
  }
};

export default writeFirebaseDoc;
