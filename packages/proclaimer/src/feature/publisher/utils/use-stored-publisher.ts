import { useEffect, useState } from "react";
import type { Publisher } from "../schemas/publisher.ts";
import { getStoredPublisher, PUBLISHER_CHANGE_EVENT } from "./stored-publisher.ts";

export function useStoredPublisher(): Publisher | null {
  const [publisher, setPublisher] = useState<Publisher | null>(getStoredPublisher);

  useEffect(() => {
    function handleChange() {
      setPublisher(getStoredPublisher());
    }

    window.addEventListener(PUBLISHER_CHANGE_EVENT, handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      window.removeEventListener(PUBLISHER_CHANGE_EVENT, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  return publisher;
}
