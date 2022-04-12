import React, { ChangeEvent } from 'react';

import Select from 'react-select';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export type SelectOptions<ValueType = string> = {
  readonly value: ValueType;
  readonly label: string;
};

type Props<V> = {
  value: V | null; /// string
  options: SelectOptions<V>[];
  name: string;
  classes?: string;
  label?: string;
  placeholder: string;
  onBlur: (e: ChangeEvent) => void;
  onChange: (value: V | null) => void;
  touched: boolean;
  error: string | undefined;
};

function SelectCustom<V>({ touched, error, ...props }: Props<V>) {
  const { name, value, placeholder, onBlur, onChange, label, options } = props;

  const styles = {
    control: (styles: object) => ({
      ...styles,
      borderRadius: 4,
      maxWidth: 350,
      height: 40,
      border: `1px solid ${
        error ? '#d06361' : touched ? '#309a74' : '#f7f6fb'
      }`,
      paddingLeft: 12,
    }),

    valueContainer: (styles: object) => ({
      ...styles,
      padding: 0,
    }),

    singleValue: (styles: object) => ({
      ...styles,
      fontSize: 14,
      fontWeight: 500,
      color: '#1E174D',
    }),

    placeholder: (styles: object) => ({
      ...styles,
      fontSize: 14,
    }),

    option: (styles: object, { isSelected }: {isSelected: boolean}) => ({
      ...styles,
      width: '100%',
      background: isSelected ? '#F7F6FB' : null,
      color: '#1E174D',
      height: 40,
      fontWeight: 500,
      padding: '14px 12px',
    }),

    menu: (styles: object) => ({
      ...styles,
      maxWidth: 350,
      overflow: 'hidden',
      borderRadius: 4,
      border: null,
      boxShadow: '0px 1px 10px rgba(30, 23, 77, 0.05);',
      zIndex: '45',
    }),

    menuList: (styles: object) => ({
      ...styles,
      paddingBottom: 0,
      paddingTop: 0,
    }),
  };

  const selectValue = value
    ? {
      value,
      label: options.find(it => it.value === value)?.label,
    }
    : null;

  return (
    <div className="selectCustom">
      {label && <Label value={label} />}
      <Select
        name={name}
        value={selectValue}
        placeholder={placeholder}
        styles={{ ...(styles as object) }}
        options={options}
        onChange={e => onChange(e?.value || null)}
        onBlur={onBlur}
      />
      {error && touched && <ErrorMessage message={error} />}
    </div>
  );
}

export default SelectCustom;
