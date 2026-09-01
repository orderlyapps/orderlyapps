import type { Congregation } from "../schemas/congregation.ts";
import { clearStoredPublisher } from "../../publisher/utils/stored-publisher.ts";

const SELECTED_CONGREGATION_KEY = "selected_congregation";

export const CONGREGATION_CHANGE_EVENT = "congregation-change";

export function getStoredCongregation(): Congregation | null {
  const stored = localStorage.getItem(SELECTED_CONGREGATION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Congregation;
  } catch {
    return null;
  }
}

export function setStoredCongregation(congregation: Congregation): void {
  localStorage.setItem(SELECTED_CONGREGATION_KEY, JSON.stringify(congregation));
  clearStoredPublisher();
  window.dispatchEvent(new Event(CONGREGATION_CHANGE_EVENT));
}

export function clearStoredCongregation(): void {
  localStorage.removeItem(SELECTED_CONGREGATION_KEY);
  clearStoredPublisher();
  window.dispatchEvent(new Event(CONGREGATION_CHANGE_EVENT));
}

export function hasSelectedCongregation(): boolean {
  return getStoredCongregation() !== null;
}
