import type { MapboxGeocodingFeature, MapboxGeocodingResponse } from "./types.ts";
import { mapboxToken } from "./mapbox-token.ts";

export type MapboxStructuredInput = {
  address_number: string;
  street: string;
  place: string;
};

export interface GeocodeOptions {
  bbox: [number, number, number, number];
  padding?: number;
}

export async function geocodeAddress(
  searchData: MapboxStructuredInput,
  options: GeocodeOptions,
): Promise<MapboxGeocodingFeature | null> {
  const { bbox, padding = 0.01 } = options;

  const [minLng, minLat, maxLng, maxLat] = bbox;
  const paddedBbox = [minLng - padding, minLat - padding, maxLng + padding, maxLat + padding];

  const tryGeocode = async (
    searchData: MapboxStructuredInput,
  ): Promise<MapboxGeocodingFeature | null> => {
    const address_number = encodeURIComponent(searchData.address_number);
    const street = encodeURIComponent(searchData.street);
    const place = encodeURIComponent(searchData.place);

    try {
      const bboxParam = paddedBbox.join(",");

      const url =
        `https://api.mapbox.com/search/geocode/v6/forward?` +
        `address_number=${address_number}&` +
        `street=${street}&` +
        `place=${place}&` +
        `access_token=${mapboxToken}&` +
        `bbox=${bboxParam}&` +
        `country=AU&` +
        `limit=1&` +
        `types=address`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
      }

      const { features }: MapboxGeocodingResponse = await response.json();

      if (!features) {
        return null;
      }

      return features[0];
    } catch (error) {
      console.error(`Geocoding error for "${address_number} ${street}, ${place}":`, error);
      return null;
    }
  };

  const result = await tryGeocode(searchData);

  if (result) {
    return result;
  }

  return null;
}

export function buildAddressString(
  houseNumber: string,
  unitNumber: string,
  streetName: string,
  suburbName: string,
): string {
  const parts: string[] = [];

  if (unitNumber.trim()) {
    parts.push(`${unitNumber.trim()}/${houseNumber.trim()}`);
  } else {
    parts.push(houseNumber.trim());
  }

  parts.push(streetName.trim());
  parts.push(suburbName.trim());

  return parts.join(" ");
}
