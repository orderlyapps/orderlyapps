import { supabase } from '@data';
import { useEffect, useState } from 'react';

export function useSBCongregarations() {
  const [congregations, setCongregations] = useState<any>([]);

  useEffect(() => {
    const getCongregations = async () => {
      let { data: congregations, error } = await supabase
        .from('congregations')
        .select();

      setCongregations(congregations);
    };

    getCongregations();
  }, []);

  return congregations;
}

export default useSBCongregarations;
