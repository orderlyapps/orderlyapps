import { firebaseKeys } from '@config';
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: firebaseKeys.apiKey,
  authDomain: firebaseKeys.authDomain,
  projectId: firebaseKeys.projectId,
  storageBucket: firebaseKeys.storageBucket,
  messagingSenderId: firebaseKeys.messagingSenderId,
  appId: firebaseKeys.appId,
  measurementId: firebaseKeys.measurementId,
};

const projectId = import.meta.env.DEV ? 'demo-1' : firebaseConfig.projectId;

const app = initializeApp({ ...firebaseConfig, projectId });

export const fdb = getFirestore();
export const auth = getAuth(app);

if (import.meta.env.DEV) {
  connectFirestoreEmulator(fdb, 'localhost', 8080);
  console.log('Firestore Emulator connected');
  // connectAuthEmulator(auth, 'http://localhost:9099');
}
