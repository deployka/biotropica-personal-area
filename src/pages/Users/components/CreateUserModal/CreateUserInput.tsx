import s from './CreateUserModal.module.scss';
import React, { HTMLInputTypeAttribute } from 'react';

type Props = {
    value: string;
    title: string;
    type?: HTMLInputTypeAttribute;
    placeholder: string;
    onChange(val: string): void;
}

export function CreateUserInput(props: Props) {
  return <div className={s.input}>
    <p>{props.title}</p>
    <input
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e.target.value)}
    />
  </div>;
}
