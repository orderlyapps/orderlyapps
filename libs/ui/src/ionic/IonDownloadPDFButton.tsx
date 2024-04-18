import { IonButton } from '@ionic/react';
import { DocumentProps, PDFDownloadLink } from '@react-pdf/renderer';
import { JSXElementConstructor, ReactElement } from 'react';

export const IonDownloadPDFButton = ({
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
          <IonButton disabled expand='block' className='ion-padding-vertical'>Loading Document...</IonButton>
        ) : (
          <IonButton expand='block' className='ion-padding-vertical'>Download</IonButton>
        )
      }
    </PDFDownloadLink>
  );
};
