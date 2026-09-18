import type { Bookmark } from "./types.ts";
import { BookmarkCard } from "./BookmarkCard.tsx";

export function BookmarkGrid({
  bookmarks,
  onDelete,
}: {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
}) {
  if (bookmarks.length === 0) {
    return <p className="empty-state">No bookmarks yet. Add your first one above.</p>;
  }

  return bookmarks.map((bookmark) => (
    <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
  ));
}
