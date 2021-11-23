import React from 'react';
import classNames from 'classnames';

import DatePicker from 'react-datepicker';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

import s from './DatePickerCustom.module.scss';
import { Label } from '../Label/Label';

interface Props {
  onChange: any;
  onBlur: any;
  onSelect: any;
  dateFormat: string;
  maxDate: Date;
  scrollableYearDropdown: any;
  name: string;
  locale: any;
  showYearDropdown: any;
  selected: any;
  withPortal?: boolean;
  options: {
    classes?: any;
    touched: any;
    errors: any;
    yearDropdownItemNumber: number;
    customInput: any;
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
        customInput={customInput}
      />
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name]} />
      )}
    </>
  );
};
