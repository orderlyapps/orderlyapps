import {
  GetFirestoreDocumentData,
  GetIntegerFromDate,
  LogDateFromInteger,
  PDFFormatTesting,
  SubscribeToFirestoreDocumentData,
  WriteTestFirestoreDocumentData,
} from '@feature';
import { Select } from '@ui';
import { useState } from 'react';

export const TheocraticSoftware = () => {
  const [tool, setTool] = useState(0);
  const tools = [
    <SubscribeToFirestoreDocumentData></SubscribeToFirestoreDocumentData>,
    <WriteTestFirestoreDocumentData></WriteTestFirestoreDocumentData>,
    <GetFirestoreDocumentData></GetFirestoreDocumentData>,
    <PDFFormatTesting></PDFFormatTesting>,
    <LogDateFromInteger></LogDateFromInteger>,
    <GetIntegerFromDate></GetIntegerFromDate>
  ];

  const options = [
    { label: 'Subscribe Firestore Document Data' },
    { label: 'Write Test Firestore Doc' },
    { label: 'Get Firestore Document Data' },
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
