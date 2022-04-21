import React, {
  ChangeEventHandler,
  ClipboardEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
} from 'react';
import classNames from 'classnames';

import s from './RadioButton.module.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Label } from '../Label/Label';
import { Classes } from '../Input/Input';
import { FormikErrors, FormikTouched } from 'formik';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onPaste?: ClipboardEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
  onBlur: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  placeholder: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  type: string;
  options: {
    classes?: Classes;
    touched: FormikTouched<{ [key in string]: unknown }>;
    errors: FormikErrors<{ [key in string]: unknown }>;
    placeholderActive?: string;
  };
}

export const RadioButton = (props: Props) => {
  const { options, name, ...inputProps } = props;
  const { touched, errors, classes } = options;

  return (
    <>
      <input
        id={name}
        className={classNames({
          ...classes,
          [s.input]: true,
          [s.active]: !!props.value,
          [s.success__input]: touched[props.name] && !errors[props.name],
          [s.error__input]: touched[props.name] && errors[props.name],
        })}
        {...inputProps}
        placeholder=""
        type="radio"
      />
      <Label active={false} value={props.placeholder} />
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name] || ''} />
      )}
    </>
  );
};
