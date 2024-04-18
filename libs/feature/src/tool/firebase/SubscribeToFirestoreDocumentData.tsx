import {
  getFirestoreDocumentSize,
  useFirestoreData,
  writeFirebaseDoc,
} from '@data';
import { Button } from '@ui';

export const SubscribeToFirestoreDocumentData = () => {
  const data = useFirestoreData({
    collection: 'test',
    document: 'test',
  });

  getFirestoreDocumentSize(data);

  const handleClick = async () => {
    await writeFirebaseDoc({
      collection: 'test',
      document: 'test',
      data: ({ existingData }) => {
        return { success: !existingData?.success };
      },
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Toggle Data</Button>
      Data: {JSON.stringify(data)}
    </>
  );
};
