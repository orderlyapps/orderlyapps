import { Document } from '@react-pdf/renderer';

export const PDFDocument = ({children}: any) => {
  return (
      <Document>{children}</Document>
  );
};
