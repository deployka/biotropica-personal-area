import React from 'react';
import classNames from 'classnames';

import s from './TimePickerCustom.module.scss';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import TimePicker, { TimePickerValue } from 'react-time-picker';

interface Props {
  name: string;
  value: Date | string | undefined;
  label?: string,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: TimePickerValue) => void;
  touched: boolean;
  error: string | undefined;
}

export const TimePickerCustom = ({ value, label, onChange, touched, error }: Props) => {
  return (
    <div className={s.timePickerWrapper}>
      {label && <Label value={label} />}
      <TimePicker className={classNames(s.input, error ? s.error__input : '')} value={value || ''} onChange={onChange} clearIcon={null} disableClock={true} />
      {touched && error && <ErrorMessage message={error} />}
    </div>
  );
};
