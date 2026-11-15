import { useContext } from "react";
import { NotAtHomeVisibilityContext } from "../context/NotAtHomeVisibilityContext";

export function useNotAtHomeVisibility() {
  const context = useContext(NotAtHomeVisibilityContext);
  if (context === undefined) {
    throw new Error("useNotAtHomeVisibility must be used within a NotAtHomeVisibilityProvider");
  }
  return context;
}
