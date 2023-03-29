import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MaskedInput from 'react-maskedinput';
import { ru } from 'date-fns/locale';

import s from './DatePickerCustom.module.scss';

export interface Props {
  name: string;
  label: string;
  selected: Date | null;
  locale?: Locale;
  maxDate?: Date;
  minDate?: Date;
  dateFormat?: string;
  dateFormatCalendar?: string;
  yearDropdownItemNumber?: number;
  showYearDropdown?: boolean;
  scrollableYearDropdown?: boolean;
  classes?: string;
  customInput?: React.ReactNode;
  // eslint-disable-next-line
  onSelect: (date: any) => void;
  // eslint-disable-next-line
  onChange: (date: any) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const DatePickerCustom = (props: Props) => {
  const {
    selected,
    onBlur,
    onChange,
    minDate,
    maxDate,
    label,
    yearDropdownItemNumber,
    ...inputProps
  } = props;

  const [, meta] = useField(props);
  const isError = meta.touched && meta.error;

  const getDateByUTC = (date: Date): Date => {
    const returnedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    return returnedDate;
  };

  const changeAndSelectHandler = (date: Date): void => {
    onChange(getDateByUTC(date));
  };

  return (
    <>
      <Label value={label} />
      <DatePicker
        className={classNames({
          [s.input]: true,
          [s.success__input]: meta.touched && !isError,
          [s.error__input]: isError,
        })}
        {...inputProps}
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown
        dateFormat={'dd.MM.yyyy'}
        customInput={<MaskedInput mask="11.11.1111" placeholder="DD.MM.YYYY" />}
        selected={selected}
        minDate={minDate}
        maxDate={maxDate}
        locale={ru}
        yearDropdownItemNumber={yearDropdownItemNumber}
        onBlur={e => onBlur(e)}
        onSelect={changeAndSelectHandler}
        onChange={changeAndSelectHandler}
        calendarStartDay={1}
      />
      {meta.touched && meta.error && <ErrorMessage message={meta.error} />}
    </>
  );
};

export default DatePickerCustom;
