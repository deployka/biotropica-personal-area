import { createContext, Dispatch, SetStateAction } from 'react';
import { Dates } from '../shared/Global/Calendar/Calendar';

interface Props {
  dates: Dates;
  setDates: Dispatch<SetStateAction<Dates>>;
}

export const DateContext = createContext<Props>({
  dates: {
    startDate: null,
    endDate: null,
  },
  setDates: () => null,
});
