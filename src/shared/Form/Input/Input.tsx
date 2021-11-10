import React from 'react';
import classNames from 'classnames';

import s from './Input.module.scss';
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
    placeholderActive?: string;
  };
}

export const Input = (props: Props) => {
  const { options, ...inputProps } = props;
  const { touched, errors, classes } = options;

  return (
    <>
      <input
        onKeyUp={(e) => {
          const target = e.target as HTMLInputElement;
        }}
        className={classNames({
          ...classes,
          [s.input]: true,
          [s.active]: !!props.value,
          [s.success__input]: touched[props.name] && !errors[props.name],
          [s.error__input]: touched[props.name] && errors[props.name],
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
