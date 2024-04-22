import { SetStateAction, useState } from 'react';

export const LogDateFromInteger = () => {
  const [date, setDate] = useState('second');

  const handleClick = (e: any) => {
    const inputValue = (e.target.previousElementSibling as HTMLInputElement).value;
    setDate(new Date(parseInt(inputValue)).toLocaleString());
  };

  return (
    <div className="full centered">
      <label htmlFor="">Enter Number:</label>
      <input></input>
      <button
        onClick={handleClick}
        style={{ margin: 10, background: '#4a6da7', width: 100 , color: 'white', height: 30}}
      >
        Log
      </button>
      Date: {date}
    </div>
  );
};
