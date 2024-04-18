import { View } from '@react-pdf/renderer';

export const PDFDivider = ({ color = '#000', height = 2 }) => {
  return (
    <View
      style={{ backgroundColor: color, width: '100%', height: height }}
    ></View>
  );
};
