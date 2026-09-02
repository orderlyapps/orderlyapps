import "./style.css";
import { addBookmark, getBookmarks, normalizeUrl, removeBookmark } from "./bookmarks/store.ts";
import { renderGrid } from "./bookmarks/render.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <header class="app-header">
    <h1>Home</h1>
    <form id="add-form" class="add-form" autocomplete="off">
      <input id="bookmark-name" name="name" type="text" placeholder="Name (optional)" maxlength="80" />
      <input id="bookmark-url" name="url" type="text" placeholder="example.com" required maxlength="2048" />
      <button type="submit" class="add-button">Add</button>
    </form>
    <p id="form-error" class="form-error" role="alert" hidden></p>
  </header>
  <main>
    <section id="grid" class="grid" aria-label="Bookmarks"></section>
  </main>
`;

const grid = app.querySelector<HTMLElement>("#grid")!;
const form = app.querySelector<HTMLFormElement>("#add-form")!;
const nameInput = app.querySelector<HTMLInputElement>("#bookmark-name")!;
const urlInput = app.querySelector<HTMLInputElement>("#bookmark-url")!;
const errorEl = app.querySelector<HTMLParagraphElement>("#form-error")!;

function refresh(): void {
  renderGrid(grid, getBookmarks(), handleDelete);
}

function handleDelete(id: string): void {
  removeBookmark(id);
  refresh();
}

function showError(message: string): void {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function clearError(): void {
  errorEl.hidden = true;
  errorEl.textContent = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const url = urlInput.value;
  if (!normalizeUrl(url)) {
    showError("Enter a valid URL, e.g. example.com");
    return;
  }

  const added = addBookmark({ name: nameInput.value, url });
  if (!added) {
    showError("Could not add bookmark. Check the URL.");
    return;
  }

  nameInput.value = "";
  urlInput.value = "";
  nameInput.focus();
  refresh();
});

urlInput.addEventListener("input", clearError);
nameInput.addEventListener("input", clearError);

refresh();
