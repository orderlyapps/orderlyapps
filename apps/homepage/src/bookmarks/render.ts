import type { Bookmark } from "./types.ts";
import { faviconUrl, hostnameFromUrl } from "./store.ts";

export function renderGrid(
  container: HTMLElement,
  bookmarks: Bookmark[],
  onDelete: (id: string) => void,
): void {
  container.innerHTML = "";

  if (bookmarks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No bookmarks yet. Add your first one above.";
    container.appendChild(empty);
    return;
  }

  for (const bookmark of bookmarks) {
    container.appendChild(createCard(bookmark, onDelete));
  }
}

function createCard(bookmark: Bookmark, onDelete: (id: string) => void): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "bookmark-card";

  const link = document.createElement("a");
  link.href = bookmark.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const icon = document.createElement("img");
  icon.className = "bookmark-icon";
  icon.src = faviconUrl(bookmark.url);
  icon.alt = "";
  icon.loading = "lazy";
  icon.width = 32;
  icon.height = 32;
  icon.addEventListener("error", () => {
    icon.replaceWith(createFallbackLetter(bookmark.name));
  });

  const name = document.createElement("span");
  name.className = "bookmark-name";
  name.textContent = bookmark.name;

  const host = document.createElement("span");
  host.className = "bookmark-host";
  host.textContent = hostnameFromUrl(bookmark.url);

  const meta = document.createElement("span");
  meta.className = "bookmark-meta";
  meta.append(name, host);

  link.append(icon, meta);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "bookmark-delete";
  deleteBtn.setAttribute("aria-label", `Delete ${bookmark.name}`);
  deleteBtn.textContent = "×";
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    onDelete(bookmark.id);
  });

  wrapper.append(link, deleteBtn);
  return wrapper;
}

function createFallbackLetter(name: string): HTMLElement {
  const el = document.createElement("span");
  el.className = "bookmark-fallback";
  el.textContent = (name.trim()[0] ?? "?").toUpperCase();
  return el;
}
