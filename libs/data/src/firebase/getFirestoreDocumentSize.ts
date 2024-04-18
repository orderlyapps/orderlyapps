import sizeof from 'firestore-size';

export type FirestoreDocumentSize = {
  bytes: number;
  KB: number;
  percent: number;
};

export const getFirestoreDocumentSize = (document: any) => {
  const bytes = sizeof(document);
  const percentage = ((bytes / 1024 / 1024) * 100).toFixed(2);

  if (bytes < 1024) {
    console.log(`Document size: ${bytes} bytes (${percentage})%`);
  } else {
    console.log(
      `Document size: ${(bytes / 1024).toFixed(2)} KB (${percentage})%`
    );
  }

  return { bytes: bytes, KB: (bytes / 1024).toFixed(2), percent: percentage };
};

export default getFirestoreDocumentSize;
