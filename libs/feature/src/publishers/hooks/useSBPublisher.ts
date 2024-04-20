import { supabase } from '@data';
import { useEffect, useState } from 'react';

export function useSBPublisher(id: string) {
  const [publisher, setPublisher] = useState<any>([]);

  useEffect(() => {
    const getPublisher = async () => {
      let { data: publisher, error } = await supabase
        .from('publishers')
        .select()
        .eq('id', id);

      setPublisher(publisher || {});
    };

    getPublisher();
  }, [id]);

  return publisher[0];
}

export default useSBPublisher;
