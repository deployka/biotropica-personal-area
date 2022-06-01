import React, { useState } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import checkIcon from '../../assets/icons/input/check.svg';
import cancelIcon from '../../assets/icons/input/cancel.svg';

import s from './Input.module.scss';

export enum InputTypes {
  TEXT = 'text',
  NAME = 'name',
  LAST_NAME = 'lastname',
  PATRONYMIC = 'patronymic',
  PASSWORD = 'password',
  EMAIL = 'email',
  PHONE = 'phone',
  NUMBER = 'number',
}

export interface Props {
  name: string;
  value?: string | number;
  classes?: string;
  type: InputTypes;
  label?: string;
  placeholder: string;
  autoComplete?: string;
  disabled?: boolean;
  suffix?: string;
  withAccept?: boolean;
  withCancel?: boolean;
  isError?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

const Input = (props: Props) => {
  const {
    value,
    classes,
    label,
    disabled,
    placeholder,
    suffix,
    withAccept,
    withCancel,
    onAccept,
    onCancel,
  } = props;

  const [field, meta] = useField(props);
  const isError = (meta.touched && meta.error) || props.isError;

  const [iconIsHidden, setIconIsHidden] = useState(true);

  return (
    <div className={s.mainWrapper}>
      {label && <Label value={label} />}

      <div
        className={classNames(
          {
            [s.inputWrapper]: true,
            [s.success__input]: meta.touched && !isError,
            [s.error__input]: isError,
          },
          classes,
        )}
      >
        <input
          className={classNames({
            [s.input]: true,
            [s.active]: !!value,
            [s.disabled__input]: disabled,
            [s.with__icon]: !iconIsHidden,
          })}
          {...field}
          {...props}
          onFocus={() => {
            if (withAccept || withCancel) setIconIsHidden(false);
          }}
          onBlur={e => {
            field.onBlur(e);

            if (withAccept || withCancel) setIconIsHidden(true);
          }}
          disabled={props.disabled}
          placeholder={placeholder}
        />

        <div className={s.icons}>
          {withAccept && !iconIsHidden && (
            <img
              src={checkIcon}
              className={s.icon}
              alt=""
              onClick={onAccept}
              onMouseDown={e => e.preventDefault()}
            />
          )}
          {withCancel && !iconIsHidden && (
            <img
              src={cancelIcon}
              className={s.icon}
              alt=""
              onClick={onCancel}
              onMouseDown={e => e.preventDefault()}
            />
          )}
        </div>

        {suffix && <div className={s.suffix}>{suffix}</div>}
      </div>

      {meta.touched && meta.error && <ErrorMessage message={meta.error} />}
    </div>
  );
};

export default Input;
