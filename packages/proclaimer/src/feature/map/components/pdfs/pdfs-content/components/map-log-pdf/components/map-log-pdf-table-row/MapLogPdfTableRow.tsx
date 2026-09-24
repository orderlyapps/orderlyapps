import { Text, View } from "@react-pdf/renderer";
import { bodyStyles, headerStyles, shared } from "../../map-log-pdf-styles.ts";
import type { MapLogPdfRow } from "../../map-log-pdf-styles.ts";

function formatDate(date_str: string | null | undefined): string {
  if (!date_str) return "";
  const date = new Date(date_str);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface MapLogPdfTableRowProps {
  isHeader?: boolean;
  isLast?: boolean;
  data?: MapLogPdfRow;
}

export function MapLogPdfTableRow({ isHeader, isLast, data }: MapLogPdfTableRowProps) {
  const rowStyle = isHeader ? headerStyles.row : isLast ? bodyStyles.rowLast : bodyStyles.row;
  const logs = data?.logs ?? [];

  return (
    <View style={[shared.row, rowStyle]}>
      <View style={[shared.row, isHeader ? headerStyles.firstCol : shared.firstCol]}>
        <View style={isHeader ? headerStyles.firstColSub : shared.firstColSub}>
          {isHeader ? (
            <Text style={headerStyles.text}>{"Terr.\nno."}</Text>
          ) : (
            <Text style={bodyStyles.text}>{data?.map_name ?? ""}</Text>
          )}
        </View>
        <View style={isHeader ? headerStyles.firstColSubLast : shared.firstColSubLast}>
          {isHeader ? (
            <Text style={headerStyles.text}>{"Last date\ncompleted*"}</Text>
          ) : (
            <Text style={bodyStyles.text}>{formatDate(data?.last_date_completed)}</Text>
          )}
        </View>
      </View>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={i < 3 ? shared.rightCol : shared.rightColLast}>
          <View style={isHeader ? headerStyles.rightColTop : shared.rightColTop}>
            {isHeader ? (
              <Text style={headerStyles.text}>Assigned to</Text>
            ) : (
              <Text style={bodyStyles.text}>{logs[i]?.publisher_name ?? ""}</Text>
            )}
          </View>
          <View
            style={[shared.row, isHeader ? headerStyles.rightColBottom : shared.rightColBottom]}
          >
            <View style={isHeader ? headerStyles.rightColSubBottom : shared.rightColSubBottom}>
              {isHeader ? (
                <Text style={headerStyles.textDate}>{"Date\nassigned"}</Text>
              ) : (
                <Text style={bodyStyles.text}>{formatDate(logs[i]?.checked_out_at)}</Text>
              )}
            </View>
            <View
              style={isHeader ? headerStyles.rightColSubBottomLast : shared.rightColSubBottomLast}
            >
              {isHeader ? (
                <Text style={headerStyles.textDate}>{"Date\ncompleted"}</Text>
              ) : (
                <Text style={bodyStyles.text}>{formatDate(logs[i]?.checked_in_at)}</Text>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
