import { useContext } from 'react';
import Context from './context';
import { RxDatabaseBaseExtended } from './plugins';

export function useRxDB(): RxDatabaseBaseExtended | null {
	const { db } = useContext(Context);
	return db;
}

export default useRxDB;
