import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: "Helvetica-Bold",
    fontWeight: 600,
    color: '#4a6da7',
  },
});

export const PDFPageHeading = ({ children }: any) => {
  return (
    <Text style={styles.header} fixed>
      {children}
    </Text>
  );
};
