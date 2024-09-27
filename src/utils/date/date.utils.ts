import dayjs from "dayjs";

export function formatDMMMhA(date: string | number | Date = new Date()): string {
  return dayjs(date).format("D MMM hA");
}

export function formatDMMM(date: string | number | Date = new Date()): string {
  return dayjs(date).format("D MMM");
}
