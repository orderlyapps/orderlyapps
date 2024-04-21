import { supabase } from '@data';
import { useEffect, useState } from 'react';

export function useSBPublishers(dep?: any) {
  const [publishers, setPublishers] = useState<any>([]);

  useEffect(() => {
    const getPublishers = async () => {
      let { data: publishers, error } = await supabase
        .from('publishers')
        .select();

      setPublishers(publishers);
    };

    getPublishers();
  }, [dep]);

  return publishers;
}

export default useSBPublishers;
