import { DocumentProps, PDFDownloadLink } from '@react-pdf/renderer';
import { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import { Button } from '../base/Button';

export const PDFDownloadButton = ({
  document,
  filename,
}: {
  document: ReactElement<DocumentProps, string | JSXElementConstructor<any>>;
  filename: string;
}) => {
  return (
    <PDFDownloadLink document={document} fileName={filename}>
      {({ loading }) =>
        loading ? (
          <Button>Loading Document...</Button>
        ) : (
          <Button>Download</Button>
        )
      }
    </PDFDownloadLink>
  );
};
