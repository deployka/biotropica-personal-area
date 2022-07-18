import React from 'react';

import s from './Analyze.module.scss';

type Props = {
  onDelete: () => void;
};

export function AnalyzePopup({ onDelete }: Props) {
  return (
    <div className={s.popup}>
      <div className={s.element} onClick={onDelete}>
        <p>Удалить</p>
      </div>
    </div>
  );
}
