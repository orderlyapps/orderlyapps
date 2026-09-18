import { useState } from "react";
import type { Bookmark } from "./types.ts";
import { faviconUrl, hostnameFromUrl } from "./store.ts";

export function BookmarkCard({
  bookmark,
  onDelete,
}: {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <div className="bookmark-card">
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
        {iconFailed ? (
          <span className="bookmark-fallback">
            {(bookmark.name.trim()[0] ?? "?").toUpperCase()}
          </span>
        ) : (
          <img
            className="bookmark-icon"
            src={faviconUrl(bookmark.url)}
            alt=""
            loading="lazy"
            width={32}
            height={32}
            onError={() => setIconFailed(true)}
          />
        )}
        <span className="bookmark-meta">
          <span className="bookmark-name">{bookmark.name}</span>
          <span className="bookmark-host">{hostnameFromUrl(bookmark.url)}</span>
        </span>
      </a>
      <button
        type="button"
        className="bookmark-delete"
        aria-label={`Delete ${bookmark.name}`}
        onClick={() => onDelete(bookmark.id)}
      >
        ×
      </button>
    </div>
  );
}
