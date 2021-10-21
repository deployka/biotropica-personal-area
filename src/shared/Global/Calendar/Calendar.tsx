import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateRangePicker } from "react-dates";
import { GlobalSvgSelector } from "../../../assets/icons/global/GlobalSvgSelector";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import s from "./Calendar.module.scss";
import moment, { Moment } from "moment";
import "react-dates/initialize";
import { DateContext } from "../../../context/DatesContext";

registerLocale("ru", ru);
interface Props {}

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
      
        startDatePlaceholderText={"Начало"}
        endDatePlaceholderText={"Конец"}
        hideKeyboardShortcutsPanel
        customInputIcon={<GlobalSvgSelector id="calendar" />}
        inputIconPosition={"after"}
        numberOfMonths={1}
        displayFormat={"DD.MM.YY"}
        customArrowIcon={<GlobalSvgSelector id="" />}
        startDate={moment(dates.startDate)} // momentPropTypes.momentObj or null,
        startDateId="1" // PropTypes.string.isRequired,
        endDate={moment(dates.endDate)} // momentPropTypes.momentObj or null,
        endDateId="2" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => {
          setDates(() => ({
            startDate: startDate && new Date(startDate?.toLocaleString()),
            endDate: endDate && new Date(endDate?.toLocaleString()),
          }));
        }} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput: any) => {
          setFocusedInput(focusedInput);
        }} // PropTypes.func.isRequired,
      />
    </div>
  );
};
