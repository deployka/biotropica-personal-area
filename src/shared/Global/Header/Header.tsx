import React, { Dispatch, memo, SetStateAction } from 'react';
import { HeaderSvgSelector } from '../../../assets/icons/header/HeaderSvgSelector';

import s from './Header.module.scss';
interface Props {
  page: string;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = memo(
  ({ page, setSidebarNotificationsOpen, setSidebarChatOpen }: Props) => {
    const notifications = [1];

    return (
      <header className={s.header}>
        <div className={s.header__wrapper}>
          <div className={s.header__title}>
            <h2>{page}</h2>
          </div>
          <div className={s.header__links}>
            <div
              onClick={() => setSidebarNotificationsOpen(true)}
              className={s.header__link}
            >
              {notifications.length ? (
                <HeaderSvgSelector id="notification-active" />
              ) : (
                <HeaderSvgSelector id="notification" />
              )}
            </div>
            <div
              onClick={() => setSidebarChatOpen(true)}
              className={s.header__link}
            >
              <HeaderSvgSelector id="chat" />
            </div>
          </div>
        </div>
      </header>
    );
  }
);
