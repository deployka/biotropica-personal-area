import React from 'react';
import editSvg from '../../../assets/icons/profile/edit.svg';
import s from './Header.module.scss';

type Props = {
  isPublic?: boolean;
  isFinished?: boolean;
  onContinue: () => void;
  onReset: () => void;
};

export const QuestionnaireTabHeader = ({ isPublic, isFinished, onContinue, onReset }: Props) => {
  return (
    <div className={s.header}>
      <div className={s.title}>
        <p>Тестирование</p>
      </div>
      {!isPublic && (
        <div className={s.updateBtn} onClick={isFinished ? onReset : onContinue}>
            <div className={s.icon}>
              <img src={editSvg} alt="edit" />
            </div>
            <p className={s.text}>{isFinished ? 'Пройти снова' : 'Продолжить'}</p>
        </div>
      )}
    </div>
  );
};
