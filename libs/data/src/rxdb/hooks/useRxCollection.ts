import { useState, useEffect, SetStateAction } from 'react';
import { RxCollection } from 'rxdb';
import useRxDB from './useRxDB';

export function useRxCollection<T>(name: string): RxCollection<T> | null {
  const [collection, setCollection] = useState<RxCollection<T> | null>(null);
  const db: any = useRxDB();

  useEffect(() => {
    if (!db) {
      return;
    }
    const found = db[name];
    if (found) {
      setCollection(found);
    }
    if (db.newCollections$) {
      const sub = db.newCollections$.subscribe(
        (col: { [x: string]: SetStateAction<RxCollection<T> | null> }) => {
          if (col[name]) {
            // We don't unsubscribe so that we get notified
            // and update collection if it gets deleted/recreated
            setCollection(col[name]);
          }
        }
      );
      return () => {
        sub.unsubscribe();
      };
    }
  }, [db, name]);

  return collection;
} 

export default useRxCollection;
