import { formatDistanceToNow, parseISO } from 'date-fns';

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getInitials(text: string) {
  if (!text.trim()) return '--';

  const [first, second] = text.trim().split(' ').filter(Boolean);

  if (first && !second) return first.charAt(0).toUpperCase() + first.charAt(1);

  return first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase();
}

export function getTimeElapsed(date: string | Date) {
  const newDate = date instanceof Date ? date : parseISO(date);
  return formatDistanceToNow(newDate, { addSuffix: true });
}
