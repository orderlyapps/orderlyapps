import { supabase } from '@data';
import { useEffect, useState } from 'react';

export const useSBSchedule = (week: number) => {
  const [schedule, setSchedule] = useState<any>([]);

  useEffect(() => {
    const getSchedule = async () => {
      let { data: schedule, error } = await supabase
        .from('schedule')
        .select()
        .eq('week', week);

      setSchedule(schedule);
    };

    getSchedule();
  }, []);

  return schedule[0];
};

export default useSBSchedule;
