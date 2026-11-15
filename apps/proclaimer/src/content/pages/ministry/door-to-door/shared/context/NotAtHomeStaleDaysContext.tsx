import { createContext, useState, useEffect, type ReactNode } from "react";
import { localStorageKeys } from "@amodeo/proclaimer/util/localStorageKeys";
import { isValidStaleDays } from "../notAtHomeStaleDays";

interface NotAtHomeStaleDaysContextType {
  staleDays: number;
  updateStaleDays: (days: number) => void;
}

const DEFAULT_STALE_DAYS = 90;

const NotAtHomeStaleDaysContext = createContext<NotAtHomeStaleDaysContextType | undefined>(
  undefined,
);

function parseStaleDays(value: string | null): number {
  if (value === null) return DEFAULT_STALE_DAYS;
  const parsed = Number(value);
  return Number.isInteger(parsed) && isValidStaleDays(parsed) ? parsed : DEFAULT_STALE_DAYS;
}

function readStoredStaleDays(): number {
  try {
    return parseStaleDays(localStorage.getItem(localStorageKeys.notAtHomeStaleDays));
  } catch {
    return DEFAULT_STALE_DAYS;
  }
}

export function NotAtHomeStaleDaysProvider({ children }: { children: ReactNode }) {
  const [staleDays, setStaleDays] = useState<number>(readStoredStaleDays);

  function updateStaleDays(days: number) {
    if (!isValidStaleDays(days)) return;
    try {
      localStorage.setItem(localStorageKeys.notAtHomeStaleDays, String(days));
      setStaleDays(days);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  // Listen for storage changes from other tabs
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === localStorageKeys.notAtHomeStaleDays) {
        setStaleDays(parseStaleDays(e.newValue));
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <NotAtHomeStaleDaysContext.Provider value={{ staleDays, updateStaleDays }}>
      {children}
    </NotAtHomeStaleDaysContext.Provider>
  );
}

export { NotAtHomeStaleDaysContext };
