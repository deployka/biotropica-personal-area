import classNames from 'classnames';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import s from './SidebarDesktop.module.scss';

import defaultAvatar from '../../../assets/images/profile/default_avatar.png';
import { SidebarSvgSelector } from '../../../assets/icons/sidebar/SIdebarSvgSelector';
import { Nav, Pages } from '../../../layouts/PrivateLayout';

interface Props {
  onNavClick: (nav: Partial<Nav>) => void;
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  chatNotificationsOpen: boolean;
  openChat: () => void;
  logout: () => void;
  pages: Pages[];
  nav: Nav[];
  user: User | undefined;
}

export const SidebarDesktop = memo(
  ({
    onNavClick,
    chatNotificationsOpen,
    pages,
    nav,
    openChat,
    logout,
    user,
  }: Props) => {
    return (
      <div className={s.sidebar}>
        <div className={s.wrapper}>
          <div className={s.top}>
            <Link
              to="/profile"
              className={classNames({
                [s.avatar]: true,
                [s.active]: pages[0].link === '/' + location.pathname.split('/')[1],
              })}
              onClick={() => onNavClick(pages[0])}
            >
              <div
                className={s.img}
                style={{
                  backgroundImage: `url(${
                    (user?.profilePhoto &&
                      process.env.REACT_APP_BACKEND_URL +
                        '/' +
                        user?.profilePhoto) ||
                    defaultAvatar
                  })`,
                }}
              ></div>
            </Link>
            <div className={s.divider}></div>
            <nav className={s.nav}>
              {nav.map((item: Nav) => (
                <Link
                  key={item.page + item.link}
                  onClick={() => onNavClick(item)}
                  to={item.link}
                  className={classNames(
                    item.link === '/' + location.pathname.split('/')[1]
                      ? s.active
                      : '',
                    s.link
                  )}
                >
                  <div className={s.icon}>{item.svg}</div>
                  <div className={s.prompt}>
                    <p>{item.page}</p>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <div className={s.bottom}>
            <div
              onClick={openChat}
              className={classNames(s.chat, chatNotificationsOpen ? s.active : '')}
            >
              <SidebarSvgSelector id="support" />
              <div className={s.prompt}>
                <p>{'Чат поддержка'}</p>
              </div>
            </div>
            <div className={s.divider}></div>

            <button onClick={logout} className={s.logout}>
              <SidebarSvgSelector id="logout" />
              <div className={s.prompt}>
                <p>{'Выйти'}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

SidebarDesktop.displayName = 'SidebarDesktop';
