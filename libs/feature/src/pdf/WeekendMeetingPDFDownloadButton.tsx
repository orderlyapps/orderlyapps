import { supabase, useRxAllDocuments } from '@data';
import { IonDownloadPDFButton, PDFPage } from '@ui';
import PublicTalkPDF from './PublicTalkPDF';
import { Document, Text, View } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

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
  const [schedule, setSchedule] = useState<any>(null);

  useEffect(() => {
    const getSchedule = async () => {
      const { data: schedule, error } = await supabase
        .from('schedule')
        .select(
          `week_id, outline, 
        publicSpeaker:publicSpeaker_id (displayName, firstName, lastName) ,
        watchtowerReader:watchtowerReader_id (displayName, firstName, lastName) ,
        weekendChairman:weekendChairman_id (displayName, firstName, lastName) 
        `
        )
        .order('week_id', { ascending: true })
        .or(`week_id.gte.1714312800000`)
        .limit(9);
      setSchedule(schedule);
    };
    getSchedule();
  }, []);

  return (
    <>
      {schedule && (
        <IonDownloadPDFButton
          document={<PublicTalkPDF schedule={schedule}></PublicTalkPDF>}
          filename="Public Talks MAY-JUN"
        ></IonDownloadPDFButton>
      )}
    </>
  );
};
