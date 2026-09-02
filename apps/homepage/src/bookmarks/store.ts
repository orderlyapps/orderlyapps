import type { Bookmark, BookmarkInput } from "./types.ts";

const STORAGE_KEY = "homepage:bookmarks";

function read(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isBookmark);
  } catch {
    return [];
  }
}

function write(bookmarks: Bookmark[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    return true;
  } catch {
    return false;
  }
}

function isBookmark(value: unknown): value is Bookmark {
  if (typeof value !== "object" || value === null) return false;
  const b = value as Record<string, unknown>;
  return (
    typeof b.id === "string" &&
    typeof b.name === "string" &&
    typeof b.url === "string" &&
    typeof b.createdAt === "number"
  );
}

export function getBookmarks(): Bookmark[] {
  return read().sort((a, b) => a.createdAt - b.createdAt);
}

export function addBookmark(input: BookmarkInput): Bookmark | null {
  const url = normalizeUrl(input.url);
  if (!url) return null;
  const name = input.name.trim() || hostnameFromUrl(url);
  const bookmark: Bookmark = {
    id: crypto.randomUUID(),
    name,
    url,
    createdAt: Date.now(),
  };
  const bookmarks = read();
  bookmarks.push(bookmark);
  if (!write(bookmarks)) return null;
  return bookmark;
}

export function removeBookmark(id: string): void {
  const bookmarks = read().filter((b) => b.id !== id);
  write(bookmarks);
}

export function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }
  try {
    const u = new URL(candidate);
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function hostnameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function faviconUrl(url: string): string {
  const host = hostnameFromUrl(url);
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
}
