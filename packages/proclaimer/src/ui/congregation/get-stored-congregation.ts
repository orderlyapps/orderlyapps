import type { Congregation } from "../../database/schemas/congregation.ts";

const SELECTED_CONGREGATION_KEY = "selected_congregation";

export function getStoredCongregation(): Congregation | null {
  const stored = localStorage.getItem(SELECTED_CONGREGATION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Congregation;
  } catch {
    return null;
  }
}
