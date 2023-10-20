import React, { ChangeEvent } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import Select, { OptionTypeBase } from 'react-select';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Label } from '../Label/Label';

import s from './SelectCustom.module.scss';

export type Styles = {
  [key in string]: string;
};
interface Props {
  hideLabel?: boolean;
  onChange?: (e: ISelect<any>) => void;
  Styles?: any;
  onBlur?: (e: ChangeEvent) => void;
  options: readonly any[] | undefined;
  isClearable?: boolean;
  value: OptionTypeBase | undefined;
  name: string;
  placeholder: string;
  settings?: {
    touched: FormikTouched<{ [key in string]: unknown }>;
    errors: FormikErrors<{ [key in string]: { value: string }[] }>;
  };
}

export type ISelect<V> = {
  value: V;
  label: string;
};

export const SelectCustom = (props: Props) => {
  const DefaultStyles = {
    control: (styles: Styles) => ({
      ...styles,
      borderRadius: 5,
      height: 50,
      border: '1px solid #9895a7',
      paddingLeft: 5,
      marginBottom: 5,
    }),

    option: (styles: Styles, { isSelected }: Styles) => ({
      ...styles,
      background: isSelected ? '#F7F6FB' : null,
      color: '#1E174D',
      height: 45,
      fontWeight: 500,
      padding: '14px 12px',
    }),
    menu: (styles: Styles) => ({
      ...styles,
      borderRadius: 5,
      border: null,
      boxShadow: '0px 1px 10px rgba(30, 23, 77, 0.05);',
      zIndex: '45',
      overflow: 'hidden',
    }),
    menuList: (styles: Styles) => ({
      ...styles,
      paddingBottom: 0,
      paddingTop: 0,
    }),
  };

  const { settings, ...selectProps } = props;
  const { touched, errors } = settings || { touched: {}, errors: {} };
  return (
    <div className={s.select}>
      {props.hideLabel || <Label active={true} value={props.placeholder} />}
      <Select
        {...selectProps}
        styles={props.Styles || DefaultStyles}
        name={props.name}
      />
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage
          message={
            Array.isArray(errors[props.name])
              ? (errors[props.name] as Array<string>)[0]
              : (errors[props.name] as string)
          }
        />
      )}
    </div>
  );
};
