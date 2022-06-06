import s from './UsersFilter.module.scss';
import React from 'react';

type Props = {
  title: string;
  opened: boolean;
  onVisibilityChanged(val: boolean): void;
};

// TODO: вынести svg
export function UserFilterHeader(props: Props) {
  return (
    <div
      className={s.name}
      onClick={() => props.onVisibilityChanged(!props.opened)}
    >
      <p>{props.title}</p>
      <div className={s.arrowIcon}>
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.4999 9.37894L6.7876 5.66663L3.07529 9.37894"
            stroke="#1E174D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
