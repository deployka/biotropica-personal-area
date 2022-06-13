import React from 'react';

import editSvg from '../../../assets/icons/profile/edit.svg';

import s from './Header.module.scss';

type Props = {
  onAddAnalyzeClick: () => void;
};

export const AnalyzesHeader = ({ onAddAnalyzeClick }: Props) => {
  return (
    <div className={s.header}>
      <p className={s.title}>Анализы</p>
      <button onClick={onAddAnalyzeClick} className={s.updateBtn}>
        <p>загрузить новые</p>
        <img src={editSvg} />
      </button>
    </div>
  );
};
