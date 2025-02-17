export function getTimeDifferenceFormatted(
  time1: string,
  time2: string
): string {
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  const totalMinutes = Math.floor(diffInMs / (1000 * 60));

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hrs ${minutes} min`;
}
