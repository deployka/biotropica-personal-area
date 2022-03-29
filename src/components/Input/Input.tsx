import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

import s from './Input.module.scss';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export enum InputTypes {
  TEXT = 'text',
  NAME = 'name',
  LAST_NAME = 'lastname',
  PATRONYMIC = 'patronymic',
  PASSWORD = 'password',
  EMAIL = 'email',
  PHONE= 'phone',
  NUMBER='number'
}

export interface Props {
  name: string;
  value?: string | number;
  classes?: string;
  type?: InputTypes;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = (props: Props) => {
  const {
    value,
    classes,
    label,
    disabled,
  } = props;

  const [, meta] = useField(props);
  const isError = meta.touched && meta.error;

  return (
    <div className={s.wrapperInput}>
      {label && <Label value={label} />}
      <input
        className={classNames({
          [s.input]: true,
          [s.active]: !!value,
          [s.disabled__input]: disabled,
          [s.success__input]: meta.touched && !isError,
          [s.error__input]: isError,
        }, classes)}
        name={props.name}
        onBlur={props.onBlur}
        onInput={props.onInput}
        onChange={props.onChange}
      />

      {
        meta.touched &&
        meta.error && (
          <ErrorMessage message={meta.error} />
        )
      }
    </div>
  );
};

export default Input;
