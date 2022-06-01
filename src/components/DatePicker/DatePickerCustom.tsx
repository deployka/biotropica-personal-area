import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';

import s from './DatePickerCustom.module.scss';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MaskedInput from 'react-maskedinput';

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

  function getDateByUTC(date: Date): Date {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
  }

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
        locale={'ru'}
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown
        dateFormat={'dd.MM.yyyy'}
        customInput={<MaskedInput mask="11.11.1111" placeholder="dd.mm.yyyy" />}
        selected={selected}
        minDate={minDate}
        maxDate={maxDate}
        yearDropdownItemNumber={yearDropdownItemNumber}
        onBlur={e => onBlur(e)}
        onSelect={(date: Date) => onChange(getDateByUTC(date))}
        onChange={(date: Date) => onChange(getDateByUTC(date))}
      />
      {meta.touched && meta.error && <ErrorMessage message={meta.error} />}
    </>
  );
};

export default DatePickerCustom;
