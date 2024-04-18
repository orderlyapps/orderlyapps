import { Page, StyleSheet } from '@react-pdf/renderer';

export const PDFPage = ({ children }: any) => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: "10mm",
      paddingBottom: "10mm",
      paddingHorizontal: "10mm",
    },
  });
  return (
    <Page style={{ ...styles.body}}>
      {children}
    </Page>
  );
};
