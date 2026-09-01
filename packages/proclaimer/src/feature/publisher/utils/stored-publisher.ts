import type { Publisher } from "../schemas/publisher.ts";

const SELECTED_PUBLISHER_KEY = "selected_publisher";

export const PUBLISHER_CHANGE_EVENT = "publisher-change";

export function getStoredPublisher(): Publisher | null {
  const stored = localStorage.getItem(SELECTED_PUBLISHER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Publisher;
  } catch {
    return null;
  }
}

export function setStoredPublisher(publisher: Publisher): void {
  localStorage.setItem(SELECTED_PUBLISHER_KEY, JSON.stringify(publisher));
  window.dispatchEvent(new Event(PUBLISHER_CHANGE_EVENT));
}

export function clearStoredPublisher(): void {
  localStorage.removeItem(SELECTED_PUBLISHER_KEY);
  window.dispatchEvent(new Event(PUBLISHER_CHANGE_EVENT));
}

export function hasSelectedPublisher(): boolean {
  return getStoredPublisher() !== null;
}
