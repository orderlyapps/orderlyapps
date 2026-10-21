import type { Size } from "../types/size.ts";

export type FontSize = Extract<Size, "xs" | "sm" | "md" | "lg" | "xl" | "2xl">;
