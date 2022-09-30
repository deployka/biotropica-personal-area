import React, {
  ClipboardEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';

import s from './NumberInput.module.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Label } from '../Label/Label';
import { FormikErrors, FormikTouched } from 'formik';

export type Classes = {
  [x in string]: boolean;
};

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  placeholder?: string;
  label?: string;
  name: string;
  value?: number;
  options?: {
    classes?: Classes;
    touched: FormikTouched<{ [key in string]: unknown }>;
    errors: FormikErrors<{ [key in string]: unknown }>;
    placeholderActive?: string;
  };
}

export const NumberInput = ({ onChange, ...props }: Props) => {
  const { options, ...inputProps } = props;
  const { touched, errors, classes } = options || { touched: {}, errors: {} };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) return;

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <input
        className={classNames({
          ...classes,
          [s.input]: true,
          [s.active]: !!props.value,
          [s.success__input]: touched[props.name] && !errors[props.name],
          [s.error__input]: touched[props.name] && errors[props.name],
        })}
        {...inputProps}
        onInput={handleInput}
        placeholder={props.placeholder}
        inputMode="numeric"
      />
      {props.label && (
        <Label active={props.value !== undefined} value={props.label} />
      )}
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name] || ''} />
      )}
    </>
  );
};
