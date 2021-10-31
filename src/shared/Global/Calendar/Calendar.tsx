
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import s from './Calendar.module.scss';
import moment, { Moment } from 'moment';
import 'react-dates/initialize';
import { Dates } from '../../../pages/Goals/containers/Goals';

registerLocale('ru', ru);
interface Props {
  startDate: Date;
  endDate: Date;
  setGraphDates: Dispatch<SetStateAction<Dates>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
}


export interface CalendarDates {
  startDate: Moment | null;
  endDate: Moment | null;
}

export const Calendar = ({
  startDate,
  endDate,
  setGraphDates,
  setActiveTab,
}: Props) => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );

  const [dates, setDates] = useState<CalendarDates>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    setDates({ startDate: moment(startDate), endDate: moment(endDate) });
    setGraphDates({ startDate, endDate });
  }, [startDate, endDate]);

  return (
    <div className={s.calendar}>
      <DateRangePicker
        startDatePlaceholderText={"Начало"}
        endDatePlaceholderText={"Конец"}
        hideKeyboardShortcutsPanel
        customInputIcon={<GlobalSvgSelector id="calendar" />}
        inputIconPosition={"after"}
        numberOfMonths={1}
        displayFormat={'DD.MM.YY'}
        isOutsideRange={() => false}
        customArrowIcon={' '}
        startDate={dates.startDate}
        startDateId="1"
        endDate={dates.endDate}
        endDateId="2"
        onDatesChange={({ startDate, endDate }) => {
          setDates(() => ({
            startDate,
            endDate,
          }));
          setGraphDates({
            startDate: new Date(startDate?.toString() || ''),
            endDate: new Date(endDate?.toString() || ''),
          });
          if (setActiveTab) {
            setActiveTab('off');
          }
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput: FocusedInputShape | null) => {
          setFocusedInput(focusedInput);
        }}
      />
    </div>
  );
};
