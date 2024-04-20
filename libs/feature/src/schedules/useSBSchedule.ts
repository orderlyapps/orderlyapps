import { supabase } from '@data';
import { useEffect, useState } from 'react';

export const useSBSchedule = () => {
  const [schedule, setSchedule] = useState<any>([]);

  useEffect(() => {
    const getSchedule = async () => {
      let { data: schedule, error } = await supabase.from('schedule').select();

      setSchedule(schedule);
    };

    getSchedule();
  }, []);

  return schedule;
};

export default useSBSchedule;
