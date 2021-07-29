import { formatDistance } from 'date-fns';
import rulang from 'date-fns/locale/ru';

export const formatDate = (date: Date | null): string => {
  if (!date) {
    return '';
  }
  return formatDistance(date, new Date(), { locale: rulang });
};
