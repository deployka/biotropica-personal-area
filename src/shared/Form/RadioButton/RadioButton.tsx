import React from 'react';
import classNames from 'classnames';

import s from './RadioButton.module.scss';
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
  checked?: any;
  options: {
    classes?: any;
    touched: any;
    errors: any;
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
        <ErrorMessage message={errors[props.name]} />
      )}
    </>
  );
};
