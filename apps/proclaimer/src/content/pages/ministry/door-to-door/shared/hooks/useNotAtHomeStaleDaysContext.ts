import { useContext } from "react";
import { NotAtHomeStaleDaysContext } from "../context/NotAtHomeStaleDaysContext";

export function useNotAtHomeStaleDays() {
  const context = useContext(NotAtHomeStaleDaysContext);
  if (context === undefined) {
    throw new Error("useNotAtHomeStaleDays must be used within a NotAtHomeStaleDaysProvider");
  }
  return context;
}
