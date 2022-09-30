import React from 'react';
import s from './Field.module.scss';

type FilterCheckboxOptionProps = {
  label: string;
  groupName: string;
  checked: boolean;
  onChange(): void;
};

export function FilterRadioOption({
  label,
  groupName,
  checked,
  onChange,
}: FilterCheckboxOptionProps) {
  const key = Math.random().toString();
  return (
    <div className={s.checkbox}>
      <input
        type="radio"
        name={groupName}
        id={key}
        onChange={() => onChange()}
        checked={checked}
      />

      <label htmlFor={key}>
        <div className={s.checkboxSquere}>
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7294 0.31971C11.1565 -0.31158 10.5119 0.0830534 9.93898 0.714344L4.56767 7.02722L2.06103 3.87076C1.48809 3.23947 0.843499 2.84491 0.270552 3.4762C-0.302394 4.1075 0.127337 4.73879 0.700284 5.37008L3.56502 8.52653C3.85149 8.84218 4.13796 9 4.56767 9C4.99738 9 5.28386 8.84218 5.57033 8.52653L11.2998 2.21362C11.8727 1.58233 12.3024 0.951001 11.7294 0.31971Z"
              fill="white"
            />
          </svg>
        </div>
        <p>{label}</p>
      </label>
    </div>
  );
}
