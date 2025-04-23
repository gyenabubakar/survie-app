import { formatDistanceToNow, parseISO } from 'date-fns';

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getInitials(text: string) {
  if (!text) return '--';

  const words = text.split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase() + words[0].charAt(1);
  }

  return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
}

export function getTimeElapsed(date: string | Date) {
  const newDate = date instanceof Date ? date : parseISO(date);
  return formatDistanceToNow(newDate, { addSuffix: true });
}
