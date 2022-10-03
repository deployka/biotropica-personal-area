import { intlFormat } from 'date-fns';

export function formatDate(date: string) {
  return intlFormat(new Date(date), {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
