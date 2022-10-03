import React from 'react';

import s from './CopyField.module.scss';

import copyIcon from './../../../assets/icons/Copy.svg';

type Props = {
  text: string;
  label?: string;
  onClick: (text: string) => void;
};

export const CopyField = ({ text, label, onClick }: Props) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    onClick(text);
  };

  return (
    <>
      {label && <p className={s.label}>{label}</p>}
      <div className={s.copyField}>
        <input onClick={handleClick} value={text} />
        <div className={s.icon}>
          <img onClick={handleClick} src={copyIcon} />
        </div>
      </div>
    </>
  );
};
