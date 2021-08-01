import React from 'react';

import s from './ErrorMessage.module.scss';

interface Props {
  message: string;
}

export const ErrorMessage = ({ message }: Props) => {
  return (
    <>
      <span className={s.error}>{message}</span>
    </>
  );
};
