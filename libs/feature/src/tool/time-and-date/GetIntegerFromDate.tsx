import { SetStateAction, useState } from 'react';

export const GetIntegerFromDate = () => {
  const [date, setDate] = useState({ year: 2021, month: 1, day: 1 });
  const [integer, setInteger] = useState<number | null>(null);

  const handleOnChange = (e: { target: { value: any; name: any } }) => {
    const newDate = { ...date, [e.target.name]: e.target.value };
    const int = new Date(
      newDate.year + '-' + newDate.month + '-' + newDate.day + 'T00:00:00.000Z'
    ).getTime();
    console.log(int);
    setDate({ ...date, [e.target.name]: e.target.value });
    setInteger(int);
  };

  return (
    <div className="full centered">
      <label htmlFor="">Enter Day:</label>
      <input name="day" onChange={handleOnChange}></input>
      <label htmlFor="">Enter Month:</label>
      <input name="month" onChange={handleOnChange}></input>
      <label htmlFor="">Enter Year:</label>
      <input name="year" onChange={handleOnChange}></input>
      Integer: {integer}
    </div>
  );
};
