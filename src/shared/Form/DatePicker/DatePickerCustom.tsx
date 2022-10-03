import React, { ChangeEvent, ChangeEventHandler, ReactElement } from 'react';
import classNames from 'classnames';

import DatePicker from 'react-datepicker';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

import s from './DatePickerCustom.module.scss';
import { Label } from '../Label/Label';
import { Locale } from 'date-fns';
import { Classes } from '../Input/Input';
import { FormikErrors, FormikTouched } from 'formik';
import { ru } from 'date-fns/locale';

interface Props {
  onChange: (date: Date) => void;
  onBlur: ChangeEventHandler<HTMLInputElement>;
  onSelect: (date: Date) => void;
  dateFormat: string;
  maxDate: Date;
  scrollableYearDropdown: boolean;
  name: string;
  locale: Locale;
  showYearDropdown: boolean;
  selected: Date | null | undefined;
  withPortal?: boolean;
  options: {
    classes?: Classes;
    touched: FormikTouched<{ [key in string]: unknown }>;
    errors: FormikErrors<{ [key in string]: unknown }>;
    yearDropdownItemNumber: number;
    customInput: ReactElement;
    label: string;
  };
}

export const DatePickerCustom = (props: Props) => {
  const { options, ...inputProps } = props;
  const { touched, errors, yearDropdownItemNumber, customInput, label } =
    options;
  return (
    <>
      <Label active={true} value={label} />
      <DatePicker
        className={classNames({
          [s.input]: true,
          [s.success__input]: touched.dob && !errors.dob,
          [s.error__input]: touched.dob && errors.dob,
        })}
        {...inputProps}
        showYearDropdown
        showMonthDropdown
        onBlur={props.onBlur}
        onChange={props.onChange}
        yearDropdownItemNumber={yearDropdownItemNumber}
        scrollableYearDropdown
        locale={ru}
        customInput={customInput}
        calendarStartDay={1}
      />
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name] || ''} />
      )}
    </>
  );
};
