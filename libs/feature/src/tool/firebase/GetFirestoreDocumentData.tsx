import { fdb } from '@data';
import { Button, Input } from '@ui';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

export const GetFirestoreDocumentData = () => {
  const [query, setQuery] = useState({ Collection: '', Document: '' });

  const handleClick = async () => {
    const docRef = doc(fdb, query.Collection, query.Document);
    const docSnap = await getDoc(docRef);

    console.log(query);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  const onChange = ({ name, value }: { name: string; value: string }) => {
    setQuery({ ...query, [name]: value });
  };

  return (
    <>
      <Input placeholder="Collection" onChange={onChange}></Input>
      <Input placeholder="Document" onChange={onChange}></Input>
      <Button onClick={handleClick}>Get Document</Button>
    </>
  );
};
