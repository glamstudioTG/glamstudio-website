export function formatHumanDate(date: string | Date, locale: string = "es-ES") {
  const d = typeof date === "string" ? new Date(date) : date;

  const formatted = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
