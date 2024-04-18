import { supabase } from '@data';
import { useEffect, useState } from 'react';

// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient("https://<project>.supabase.co", "<your-anon-key>");

export function Base() {
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    let { data: congregations_test, error } = await supabase
      .from('congregations_test')
      .select();
    console.log("🚀 ~ getCountries ~ congregations_test:", congregations_test)

    setCountries(congregations_test);
  }

  return (
    <ul>sss
      {countries.map((country: any) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default Base;
