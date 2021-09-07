import React from 'react';
import classNames from 'classnames';

import s from './Textarea.module.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Label } from '../Label/Label';

interface Props {
  onChange: (e: React.ChangeEvent<any>) => void;
  onPaste?: (e: React.ChangeEvent<any>) => void;
  onKeyDown?: (e: React.ChangeEvent<any>) => void;
  onInput?: (e: React.ChangeEvent<any>) => void;
  onBlur: any;
  autoComplete?: any;
  placeholder: string;
  name: string;
  value: any;
  type: string;
  options: {
    classes?: any;
    touched: any;
    errors: any;
  };
}

export const Textarea = (props: Props) => {
  const { options, ...inputProps } = props;
  const { touched, errors, classes } = options;
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
        placeholder=""
      />
      <Label active={false} value={props.placeholder} />
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name]} />
      )}
    </>
  );
};
