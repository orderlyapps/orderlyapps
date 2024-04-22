import { useRxAllDocuments } from '@data';
import { IonDownloadPDFButton, PDFPage } from '@ui';
import PublicTalkPDF from './PublicTalkPDF';
import { Document, Text, View } from '@react-pdf/renderer';

const Doc = () => {
  return (
    <Document>
      <PDFPage>
        <View>
          <Text>hello</Text>
        </View>
      </PDFPage>
    </Document>
  );
};

export const WeekendMeetingPDFDownloadButton = () => {
  const { result: result } = useRxAllDocuments('schedule');

  return (
    <>
      {true && (
        <IonDownloadPDFButton
          document={<PublicTalkPDF schedule={result}></PublicTalkPDF>}
          filename="public-talk"
        ></IonDownloadPDFButton>
      )}
    </>
  );
};
