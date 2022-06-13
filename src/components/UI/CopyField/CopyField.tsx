import React, { useRef } from 'react';

import s from './CopyField.module.scss';

import copyIcon from './../../../assets/icons/Copy.svg';

type Props = {
  text: string;
  label?: string;
};

export const CopyField = ({ text, label }: Props) => {
  const input = useRef<HTMLInputElement | null>(null);

  //   const handleClick = () => {
  //     if (input.current) {
  //       input.current.select();
  //       document.execCommand('copy');
  //     }
  //   };

  return (
    <>
      {label && <p className={s.label}>{label}</p>}
      <div className={s.copyField}>
        <input ref={input} value={text} />
        <div className={s.icon}>
          <img src={copyIcon} />
        </div>
      </div>
    </>
  );
};
