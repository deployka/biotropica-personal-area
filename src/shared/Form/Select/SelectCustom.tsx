import React from 'react';
import Select from 'react-select';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Label } from '../Label/Label';

import s from './SelectCustom.module.scss';

interface Props {
  onChange: any;
  onBlur: any;
  options: any;
  value: any;
  name: string;
  placeholder: string;
  settings: {
    classes?: any;
    touched: any;
    errors: any;
  };
}

export const SelectCustom = (props: Props) => {
  const Styles = {
    control: (styles: any) => ({
      ...styles,
      borderRadius: 15,
      height: 50,
      border: '1px solid #9895a7',
      paddingLeft: 5,
    }),

    option: (styles: any, { data, isSelected }: any) => ({
      ...styles,
      background: isSelected ? '#F7F6FB' : null,
      color: '#1E174D',
      borderTopLeftRadius: data.value === 'Мужской' ? 15 : 0,
      borderTopRightRadius: data.value === 'Мужской' ? 15 : 0,
      borderBottomLeftRadius: data.value === 'Женский' ? 15 : 0,
      borderBottomRightRadius: data.value === 'Женский' ? 15 : 0,
      height: 45,
      fontWeight: 500,
      padding: '14px 12px',
    }),
    menu: (styles: any) => ({
      ...styles,
      borderRadius: 15,
      border: null,
      boxShadow: '0px 1px 10px rgba(30, 23, 77, 0.05);',
    }),
    menuList: (styles: any) => ({
      ...styles,
      paddingBottom: 0,
      paddingTop: 0,
    }),
  };

  const { settings, ...selectProps } = props;
  const { touched, errors } = settings;
  return (
    <>
      <Label active={true} value={props.placeholder} />
      <Select {...selectProps} styles={Styles} name="gender" />
      {touched[props.name] && errors[props.name] && (
        <ErrorMessage message={errors[props.name]} />
      )}
    </>
  );
};
