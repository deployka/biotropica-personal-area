import React from 'react';

import s from './Header.module.scss';
import notificationImg from '../../../assets/icons/header/notification.svg';
import chatImg from '../../../assets/icons/header/chat.svg';
interface Props {
  page: string;
}

export const Header = ({ page }: Props) => {
  return (
    <header className={s.header}>
      <div className={s.header__wrapper}>
        <div className={s.header__title}>
          <h2>{page}</h2>
        </div>
        <div className={s.header__links}>
          <div className={s.header__link}>
            <a href="#">
              <img src={notificationImg} alt="уведомления" />
            </a>
          </div>
          <div className={s.header__link}>
            <a href="#">
              <img src={chatImg} alt="чат" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
