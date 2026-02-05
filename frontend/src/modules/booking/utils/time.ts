export function minutesToTime(minutes: number, forBackend = false): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (forBackend) {
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  }

  const hour12 = h % 12 || 12;
  const period = h < 12 ? "AM" : "PM";

  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}
