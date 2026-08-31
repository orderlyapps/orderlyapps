export function formatDate(date_str: string): string {
  if (!date_str) return "";
  const d = new Date(date_str);
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
