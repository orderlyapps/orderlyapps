import { supabase } from '@data';
import { useEffect, useState } from 'react';

export function useSBPublisher(id: string, trigger?: any) {
  const [publisher, setPublisher] = useState<any>([{ outlines: [] }]);

  useEffect(() => {
    const getPublisher = async () => {
      let { data: publisher, error } = await supabase
        .from('publishers')
        .select()
        .eq('id', id);

      setPublisher(publisher || {});
    };

    getPublisher();
  }, [id, trigger && trigger]);

  return publisher[0];
}

export default useSBPublisher;
