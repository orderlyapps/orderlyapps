import { useRef, useState, type FormEvent } from "react";
import { addBookmark, getBookmarks, normalizeUrl, removeBookmark } from "./bookmarks/store.ts";
import { BookmarkGrid } from "./bookmarks/BookmarkGrid.tsx";
import type { Bookmark } from "./bookmarks/types.ts";

export default function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(getBookmarks);
  const [error, setError] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const refresh = () => setBookmarks(getBookmarks());

  function handleDelete(id: string) {
    removeBookmark(id);
    refresh();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);
    const nameValue = data.get("name");
    const urlValue = data.get("url");
    const name = typeof nameValue === "string" ? nameValue : "";
    const url = typeof urlValue === "string" ? urlValue : "";

    if (!normalizeUrl(url)) {
      setError("Enter a valid URL, e.g. example.com");
      return;
    }

    if (!addBookmark({ name, url })) {
      setError("Could not add bookmark. Check the URL.");
      return;
    }

    event.currentTarget.reset();
    nameInputRef.current?.focus();
    refresh();
  }

  return (
    <>
      <header className="app-header">
        <h1>Home</h1>
        <form className="add-form" autoComplete="off" onSubmit={handleSubmit}>
          <input
            ref={nameInputRef}
            name="name"
            type="text"
            placeholder="Name (optional)"
            maxLength={80}
            onChange={() => setError("")}
          />
          <input
            name="url"
            type="text"
            placeholder="example.com"
            required
            maxLength={2048}
            onChange={() => setError("")}
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
        <p className="form-error" role="alert" hidden={!error}>
          {error}
        </p>
      </header>
      <main>
        <section className="grid" aria-label="Bookmarks">
          <BookmarkGrid bookmarks={bookmarks} onDelete={handleDelete} />
        </section>
      </main>
    </>
  );
}
