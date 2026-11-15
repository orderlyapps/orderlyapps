import { createContext, useState, useEffect, type ReactNode } from "react";
import { localStorageKeys } from "@amodeo/proclaimer/util/localStorageKeys";
import { isValidNotAtHomeVisibility, type NotAtHomeVisibility } from "../notAtHomeVisibility";

interface NotAtHomeVisibilityContextType {
  visibility: NotAtHomeVisibility;
  updateVisibility: (visibility: NotAtHomeVisibility) => void;
}

const DEFAULT_VISIBILITY: NotAtHomeVisibility = "all";

const NotAtHomeVisibilityContext = createContext<NotAtHomeVisibilityContextType | undefined>(
  undefined,
);

function parseVisibility(value: string | null): NotAtHomeVisibility {
  return isValidNotAtHomeVisibility(value) ? value : DEFAULT_VISIBILITY;
}

function readStoredVisibility(): NotAtHomeVisibility {
  try {
    return parseVisibility(localStorage.getItem(localStorageKeys.notAtHomeVisibility));
  } catch {
    return DEFAULT_VISIBILITY;
  }
}

export function NotAtHomeVisibilityProvider({ children }: { children: ReactNode }) {
  const [visibility, setVisibility] = useState<NotAtHomeVisibility>(readStoredVisibility);

  function updateVisibility(value: NotAtHomeVisibility) {
    try {
      localStorage.setItem(localStorageKeys.notAtHomeVisibility, value);
      setVisibility(value);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  // Listen for storage changes from other tabs
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === localStorageKeys.notAtHomeVisibility) {
        setVisibility(parseVisibility(e.newValue));
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <NotAtHomeVisibilityContext.Provider value={{ visibility, updateVisibility }}>
      {children}
    </NotAtHomeVisibilityContext.Provider>
  );
}

export { NotAtHomeVisibilityContext };
