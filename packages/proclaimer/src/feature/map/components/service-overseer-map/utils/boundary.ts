import type { LngLatBoundsLike } from "mapbox-gl";

export function isValidBoundary(boundary: unknown): boundary is number[][] {
  if (!Array.isArray(boundary) || boundary.length === 0) return false;
  return boundary.every(
    (coord) =>
      Array.isArray(coord) &&
      coord.length >= 2 &&
      typeof coord[0] === "number" &&
      typeof coord[1] === "number",
  );
}

export function isClosedRing(boundary: number[][]): boolean {
  if (boundary.length < 4) return false;
  const first = boundary[0];
  const last = boundary[boundary.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}

export function ensureClosedRing(boundary: number[][]): number[][] {
  if (isClosedRing(boundary)) return boundary;
  return [...boundary, boundary[0]];
}

export function boundaryToBounds(boundary: unknown): LngLatBoundsLike | null {
  if (!isValidBoundary(boundary) || boundary.length < 4) return null;
  let minLng = boundary[0][0];
  let maxLng = boundary[0][0];
  let minLat = boundary[0][1];
  let maxLat = boundary[0][1];
  for (const [lng, lat] of boundary) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLng, minLat, maxLng, maxLat];
}

export function boundaryToPolygonCoords(boundary: unknown): number[][][] | null {
  if (!isValidBoundary(boundary) || boundary.length < 4) return null;
  return [ensureClosedRing(boundary)];
}

// Ray-cast point-in-polygon test over a closed ring.
function isPointInRing([x, y]: number[], ring: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// A stable anchor inside the boundary for the map's label. GeoJSON sources are
// re-tiled on the fly, so labeling the polygon itself renders one label per
// tile fragment when a map straddles a tile boundary.
export function boundaryToLabelPoint(boundary: unknown): number[] | null {
  if (!isValidBoundary(boundary) || boundary.length < 3) {
    return null;
  }
  const ring = ensureClosedRing(boundary);
  let twiceArea = 0;
  let cx = 0;
  let cy = 0;
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[i + 1];
    const cross = x0 * y1 - x1 * y0;
    twiceArea += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
    if (x0 < minLng) minLng = x0;
    if (x0 > maxLng) maxLng = x0;
    if (y0 < minLat) minLat = y0;
    if (y0 > maxLat) maxLat = y0;
  }
  const candidates: number[][] = [];
  if (Math.abs(twiceArea) > 1e-12) {
    candidates.push([cx / (3 * twiceArea), cy / (3 * twiceArea)]);
  }
  candidates.push([(minLng + maxLng) / 2, (minLat + maxLat) / 2]);
  for (const candidate of candidates) {
    if (isPointInRing(candidate, ring)) {
      return candidate;
    }
  }
  // Concave rings can place the centroid outside; pin the label to the vertex
  // nearest the centroid so it still sits on the map.
  const target = candidates[0] ?? ring[0];
  let nearest = ring[0];
  let nearestDist = Infinity;
  for (const vertex of ring) {
    const dist = (vertex[0] - target[0]) ** 2 + (vertex[1] - target[1]) ** 2;
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = vertex;
    }
  }
  return nearest;
}

export function blockCoordinatesToBounds(boundary: unknown): LngLatBoundsLike | null {
  if (!isValidBoundary(boundary) || boundary.length === 0) return null;
  let minLng = boundary[0][0];
  let maxLng = boundary[0][0];
  let minLat = boundary[0][1];
  let maxLat = boundary[0][1];
  for (const [lng, lat] of boundary) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLng, minLat, maxLng, maxLat];
}

export function blockToPolygonCoords(
  coordinates: unknown[] | null | undefined,
): number[][][] | null {
  if (!isValidBoundary(coordinates) || coordinates.length < 3) return null;
  return [ensureClosedRing(coordinates)];
}

export function blockToLineStringCoords(
  coordinates: unknown[] | null | undefined,
): number[][] | null {
  if (!isValidBoundary(coordinates) || coordinates.length < 2) return null;
  return coordinates;
}
