import { fdb, writeFirebaseDoc } from '@data';
import { Button } from '@ui';
import { doc, setDoc } from 'firebase/firestore';

export const WriteTestFirestoreDocumentData = () => {
  const handleClick = async () => {
    writeFirebaseDoc({
      collection: 'test',
      document: 'test',
      data: ({ documentExists, existingData }) => {
        return { success: false };
      },
    });
  };

  return <Button onClick={handleClick}>Write Test Firestore Doc</Button>;
};
