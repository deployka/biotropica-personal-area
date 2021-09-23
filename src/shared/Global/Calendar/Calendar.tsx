import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DateRangePicker } from 'react-dates';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import s from './Calendar.module.scss';
import moment, { Moment } from 'moment';
import 'react-dates/initialize';
import { DateContext } from '../../../context/DatesContext';

registerLocale('ru', ru);
interface Props {}

interface Days {
  [key: string]: Array<number | null>;
}

export interface Dates {
  startDate: Date | null;
  endDate: Date | null;
}

export const Calendar = ({}: Props) => {
  const [focusedInput, setFocusedInput] = useState<any>(null);
  const { setDates, dates } = useContext(DateContext);

  return (
    <div className={s.calendar}>
      <DateRangePicker
        startDatePlaceholderText={'Начало'}
        endDatePlaceholderText={'Конец'}
        hideKeyboardShortcutsPanel
        customInputIcon={<GlobalSvgSelector id="calendar" />}
        inputIconPosition={'after'}
        dayPickerNavigationInlineStyles={{ display: 'none' }}
        orientation={'vertical'}
        verticalHeight={330}
        displayFormat={'DD.MM.YY'}
        customArrowIcon={<GlobalSvgSelector id="" />}
        startDate={moment(dates.startDate) || moment(new Date())} // momentPropTypes.momentObj or null,
        startDateId="1" // PropTypes.string.isRequired,
        endDate={moment(dates.endDate)} // momentPropTypes.momentObj or null,
        endDateId="2" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          setDates(() => ({
            startDate: new Date(startDate?.toLocaleString() || new Date()),
            endDate: new Date(endDate?.toLocaleString() || new Date()),
          }));
        }} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput: any) => {
          setFocusedInput(focusedInput);
        }} // PropTypes.func.isRequired,
      />
      {/* <div className={s.icon} onClick={() => setFocusedInput('startDate')}>
        <GlobalSvgSelector id="calendar" />
      </div> */}
    </div>
  );
};
