import React, { Dispatch, memo, ReactElement, SetStateAction } from 'react';
import { HeaderSvgSelector } from '../../../assets/icons/header/HeaderSvgSelector';

import headerIcon from '../../../assets/icons/temp/logo.png';

import s from './Header.module.scss';
import classNames from 'classnames';
import { useMobile } from '../../../hooks/useMobile';
interface Props {
  page: string;
  isChatUnread: number;
  isNotificationsUnread: number;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  centerComponent?: ReactElement;
}

export const Header = memo(
  ({
    page,
    setSidebarNotificationsOpen,
    setSidebarChatOpen,
    isChatUnread,
    isNotificationsUnread,
    centerComponent,
  }: Props) => {
    const isMobile = useMobile();

    return (
      <header className={s.header}>
        <div className={s.header__wrapper}>
           <div className={s.header__headerblock_icon}>
              <div>
                <img src={headerIcon} height='30px'/>
              </div>
              <div className={s.header__title}>
                <h2>{page}</h2>
              </div>
           </div>

          {centerComponent || ''}
          {!isMobile && (
            <div className={s.header__links}>
              <div
                onClick={() => setSidebarNotificationsOpen(true)}
                className={s.header__link}
              >
                <HeaderSvgSelector id="notification" unreadCount={isNotificationsUnread} />
              </div>
              <div
                onClick={() => setSidebarChatOpen(true)}
                className={s.header__link}
              >
                <HeaderSvgSelector id="chat" unreadCount={isChatUnread} />
              </div>
            </div>
          )}
        </div>
      </header>
    );
  },
);

Header.displayName = 'Header';
