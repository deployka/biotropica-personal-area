import React from 'react';
import { Link } from 'react-router-dom';

import editSvg from '../../../assets/icons/profile/edit.svg';
import s from './Header.module.scss';

type Props = {
  isPublic?: boolean;
};

export const QuestionnaireTabHeader = ({ isPublic }: Props) => {
  return (
    <div className={s.header}>
      <div className={s.title}>
        <p>Тестирование</p>
      </div>
      {!isPublic && (
        <div className={s.updateBtn}>
          <Link to="/questionnaire">
            <div className={s.icon}>
              <img src={editSvg} alt="" />
            </div>
            <p className={s.text}>редактировать</p>
          </Link>
        </div>
      )}
    </div>
  );
};
