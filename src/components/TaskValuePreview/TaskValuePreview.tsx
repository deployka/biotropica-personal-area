import React from 'react';

import s from './TaskValuePreview.module.scss';

type Props = {
    title: string;
    value: string;
};

export const TaskValuePreview = ({ title, value }: Props) => {
  return (
    <div className={s.valueField}>
      <div className={s.title}>{title}</div>
      <div className={s.value}>{value}</div>
    </div>
  );
};
