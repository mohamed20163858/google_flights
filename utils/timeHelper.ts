export function getTimeDifferenceInMinutes(
  time1: string,
  time2: string
): number {
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diffInMs / (1000 * 60));
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
