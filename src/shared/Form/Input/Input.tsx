import React, {
  ClipboardEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react';
import classNames from 'classnames';

import s from './Input.module.scss';
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
  value: string | number | readonly string[] | undefined;
  type?: string;
  options?: {
    classes?: Classes;
    touched: FormikTouched<{ [key in string]: unknown }>;
    errors: FormikErrors<{ [key in string]: unknown }>;
    placeholderActive?: string;
  };
}

export const Input = (props: Props) => {
  const { options, ...inputProps } = props;
  const { touched, errors, classes } = options || { touched: {}, errors: {} };

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
        placeholder={props.placeholder}
      />
      {props.label ? <Label active={false} value={props.label} /> : null}
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name] || ''} />
      )}
    </>
  );
};
