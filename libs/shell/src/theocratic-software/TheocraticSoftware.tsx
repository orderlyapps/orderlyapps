import {
  GetIntegerFromDate,
  LogDateFromInteger,
  PDFFormatTesting
} from '@feature';
import { Select } from '@ui';
import { useState } from 'react';

export const TheocraticSoftware = () => {
  const [tool, setTool] = useState(0);
  const tools = [
    <PDFFormatTesting></PDFFormatTesting>,
    <LogDateFromInteger></LogDateFromInteger>,
    <GetIntegerFromDate></GetIntegerFromDate>
  ];

  const options = [
    { label: 'PDF Formatting' },
    { label: 'Log Date From Integer' },
    { label: 'Get Integer From Date' },
  ];

  const handleOnValueChange = (value: number) => {
    setTool(value);
  };

  return (
    <div className="full centered p-4 gap-2">
      <Select
        placeholder="Choose Tool"
        onValueChange={handleOnValueChange}
        options={options}
      ></Select>

      {tools[tool]}
    </div>
  );
};
