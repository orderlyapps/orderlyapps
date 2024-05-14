import { Text, Document, View } from '@react-pdf/renderer';
import { PDFPage, PDFPageHeading, PDFDivider } from '@ui';
import { formatDate } from '@util';
// import { PUBLIC_TALK_THEMES } from '../public-talks/helper/publicTalkData';
import formatDisplayName from '../publishers/name/formatDisplayName';
import { getOutline } from '../schedules/public-talks/_helper/getOutline';
// import { getOutline } from '../public-talks/helper/getOutline';

const WeekView = ({ children }: any) => {
  return (
    <View
      style={{ borderBottom: '1px solid black', flex: 1, flexDirection: 'row' }}
    >
      {children}
    </View>
  );
};

const DateView = ({ meeting }: any) => {
  const date = parseInt(meeting.week_id) + 1000 * 60 * 60 * 24 * 5;

  if (meeting.outline === 'CA')
    return (
      <View
        style={{
          fontFamily: 'Helvetica-Bold',
          fontSize: 14,
          flex: 2,
          textAlign: 'right',
          paddingRight: 8,
          color: '#4a6da7',
        }}
      >
        <Text>19</Text>
      </View>
    );

  return (
    <View
      style={{
        fontFamily: 'Helvetica-Bold',
        fontSize: 14,
        flex: 2,
        textAlign: 'right',
        paddingRight: 8,
        color: '#4a6da7',
      }}
    >
      <Text>{'formatDate(date)'}</Text>
    </View>
  );
};

const DetailsView = ({ children }: any) => {
  return <View style={{ flex: 20, flexDirection: 'column' }}>{children}</View>;
};

const ThemeView = ({ meeting }: any) => {
  return (
    <View style={{ flex: 1, fontFamily: 'Helvetica-Bold', fontSize: 14 }}>
      <Text>{getOutline(meeting.outline)}</Text>
    </View>
  );
};

const Details2View = ({ children }: any) => {
  return <View style={{ flex: 3, flexDirection: 'row' }}>{children}</View>;
};

const HeadingView = () => {
  return (
    <View style={{ flex: 1, textAlign: 'right', paddingRight: 5 }}>
      <Text>Speaker:</Text>
      <Text>Chairman:</Text>
      <Text>Reader:</Text>
    </View>
  );
};

const BrothersView = ({ meeting }: any) => {
  return (
    <View style={{ flex: 7 }}>
      <Text>
        {formatDisplayName(meeting.publicSpeaker, 'displayName lastName')}
      </Text>
      <Text>
        {formatDisplayName(meeting.weekendChairman, 'displayName lastName')}
      </Text>
      <Text>
        {formatDisplayName(meeting.watchtowerReader, 'displayName lastName')}
      </Text>
    </View>
  );
};

export const PublicTalkPDF = ({ schedule }: any) => {
  if (schedule.isFetching) return;
  return (
    <Document>
      <PDFPage>
        <PDFPageHeading>Weekend Meeting Schedule</PDFPageHeading>
        <PDFDivider height={3} color="#4a6da7"></PDFDivider>
        <View
          style={{ flexDirection: 'column', height: '250mm', fontSize: 12 }}
        >
          {true &&
            schedule.map((meeting: any, index: any) => {
              return (
                <WeekView key={index}>
                  <DateView meeting={meeting}></DateView>
                  <DetailsView>
                    {meeting.outline > 0 && (
                      <>
                        <ThemeView meeting={meeting}></ThemeView>
                        <Details2View>
                          <HeadingView></HeadingView>
                          <BrothersView meeting={meeting}></BrothersView>
                        </Details2View>
                      </>
                    )}
                    {meeting.outline === 'CA' && (
                      <View
                        style={{
                          flex: 1,
                          fontFamily: 'Helvetica-Bold',
                          fontSize: 14,
                        }}
                      >
                        <Text>CIRCUIT ASSEMBLY</Text>
                      </View>
                    )}
                  </DetailsView>
                </WeekView>
              );
            })}
        </View>
      </PDFPage>
    </Document>
  );
};

export default PublicTalkPDF;
