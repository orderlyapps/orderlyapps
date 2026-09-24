import { MapNavigation } from "./components/map-navigation/MapNavigation.tsx";
import { MapLogList } from "./components/map-log-list/MapLogList.tsx";

interface MapLogDetailContentProps {
  map_id: string;
}

export function MapLogDetailContent({ map_id }: MapLogDetailContentProps) {
  return (
    <>
      <MapNavigation map_id={map_id} />
      <MapLogList map_id={map_id} />
    </>
  );
}
