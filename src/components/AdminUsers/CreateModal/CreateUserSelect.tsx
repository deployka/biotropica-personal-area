import React, { useState } from 'react';

import s from './CreateUserModal.module.scss';

type Props = {
  title: string;
  value: string | number;
  placeholder: string;
  options: {
    label: string;
    value: string | number;
  }[];
  onChange(val: string | number): void;
};

export function CreateUserSelect(props: Props) {
  const [dropdown, setDropdown] = useState(false);
  // TODO: SVG

  function onChangeHandler(val: string | number) {
    // setDropdown(false);
    return props.onChange(val);
  }

  const valueLabel = props.options.find(it => it.value === props.value)?.label;

  return (
    <div className={s.input}>
      <p>{props.title}</p>
      <div className={s.dropdown} onClick={() => setDropdown(!dropdown)}>
        <div
          className={`${s.dropdownText}`}
          style={dropdown ? { borderTop: '1px solid #736f8b' } : {}}
        >
          <p>{valueLabel || props.placeholder}</p>
          <div className="icon">
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1.5L8 8.5L1 1.5"
                stroke="#9895A7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className={`${s.dropdownConteiner} ${dropdown ? '' : s.hidden}`}>
          {props.options.map(option => (
            <div
              key={option.value}
              className={s.dropdownElement}
              onClick={() => onChangeHandler(option.value)}
            >
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
