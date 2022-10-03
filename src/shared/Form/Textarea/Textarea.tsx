import React, {
  ChangeEventHandler,
  ClipboardEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
} from 'react';
import classNames from 'classnames';

import s from './Textarea.module.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Label } from '../Label/Label';
import { Classes } from '../Input/Input';
import { FormikErrors, FormikTouched } from 'formik';

interface Props {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onPaste?: ClipboardEventHandler<HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
  onInput?: FormEventHandler<HTMLTextAreaElement>;
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  autoComplete?: string;
  placeholder?: string;
  name: string;
  rows?: number;
  height?: string;
  value: string | number | readonly string[] | undefined;
  type?: string;
  options?: {
    classes?: Classes;
    touched: FormikTouched<{ [key in string]: unknown }>;
    errors: FormikErrors<{ [key in string]: unknown }>;
    placeholderActive?: string;
  };
}

export const Textarea = (props: Props) => {
  const { options, ...inputProps } = props;
  const { touched, errors, classes } = options || { touched: {}, errors: {} };
  return (
    <>
      <textarea
        className={classNames({
          ...classes,
          [s.textarea]: true,
          [s.active]: !!props.value,
          [s.success__textarea]: touched[props.name] && !errors[props.name],
          [s.error__textarea]: touched[props.name] && errors[props.name],
        })}
        {...inputProps}
        placeholder={undefined}
      />
      {props.placeholder && <Label active={false} value={props.placeholder} />}
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name] || ''} />
      )}
    </>
  );
};
