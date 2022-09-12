import React from 'react';

import editSvg from '../../../assets/icons/profile/edit.svg';

import s from './Header.module.scss';

type Props = {
  isEditable: boolean;
  onAddAnalyzeClick: () => void;
};

export const AnalyzesHeader = ({ isEditable, onAddAnalyzeClick }: Props) => {
  return (
    <div className={s.header}>
      <p className={s.title}>Анализы</p>
      {isEditable && (
        <button onClick={onAddAnalyzeClick} className={s.updateBtn}>
          <p>загрузить новые</p>
          <img src={editSvg} />
        </button>
      )}
    </div>
  );
};
