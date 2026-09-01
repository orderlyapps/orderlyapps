import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { Publisher } from "@amodeo/proclaimer/feature/publisher";
import {
  getPublisherDisplayName,
  type PublisherName,
  type NameFormat,
} from "@amodeo/proclaimer/feature/publisher";

export { getPublisherDisplayName, type PublisherName, type NameFormat };

export function getStoredPublisher(): Publisher | null {
  const stored = localStorage.getItem(localStorageKeys.selectedPublisher);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Publisher;
  } catch {
    return null;
  }
}

export function setStoredPublisher(publisher: Publisher): void {
  localStorage.setItem(localStorageKeys.selectedPublisher, JSON.stringify(publisher));
  window.dispatchEvent(new Event("publisher-change"));
}

export function clearStoredPublisher(): void {
  localStorage.removeItem(localStorageKeys.selectedPublisher);
  window.dispatchEvent(new Event("publisher-change"));
}

export function hasSelectedPublisher(): boolean {
  return getStoredPublisher() !== null;
}
