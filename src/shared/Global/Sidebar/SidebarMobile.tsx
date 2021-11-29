import classNames from 'classnames';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import s from './SidebarMobile.module.scss';

import { useModal } from '../../../hooks/useModal';
import { SidebarSvgSelector } from '../../../assets/icons/sidebar/SIdebarSvgSelector';
import { ModalName } from '../../../providers/ModalProvider';
import { Nav, Pages } from '../../../layouts/PrivateLayout';

interface Props {
  setPage: Dispatch<SetStateAction<string>>;
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  chatNotificationsOpen: boolean;
  openChat: () => void;
  logout: () => void;
  pages: Pages[];
  nav: Nav[];
  user: User | undefined;
  location: any;
}

export const SidebarMobile = memo(
  ({
    setPage,
    setSidebarChatOpen,
    setSidebarNotificationsOpen,
    pages,
    nav,
    openChat,
    logout,
    user,
    location,
  }: Props) => {
    const { openModal } = useModal();

    return (
      <div className={s.sidebar}>
        <div className={s.wrapper}>
          <div
            className={s.menu}
            onClick={() =>
              openModal(ModalName.MODAL_SIDEBAR_MENU, {
                nav: nav,
                setPage: setPage,
                openChat: openChat,
                logout: logout,
                user,
                pages,
                location,
              })
            }
          >
            <div className="icon">
              <SidebarSvgSelector id="menu" />
            </div>
            <p>Меню</p>
          </div>

          <Link
            key={nav[0].page}
            onClick={() => setPage(nav[0].page)}
            to={nav[0].link}
            className={classNames(
              s.homeLink,
              nav[0].link === '/' + location.pathname.split('/')[1]
                ? s.active
                : ''
            )}
          >
            <div className={s.icon}>{nav[0].svg}</div>
          </Link>

          <div
            className={s.chatButton}
            onClick={() => {
              openModal(ModalName.MODAL_NOTIFICATIONS_MENU, {
                setSidebarChatOpen: setSidebarChatOpen,
                setSidebarNotificationsOpen: setSidebarNotificationsOpen,
                setPage,
                pages,
                user,
                location,
              });
            }}
          >
            <div className={s.icon}>
              <SidebarSvgSelector id="chat" />
            </div>
            <p>Входящие</p>
          </div>
        </div>
      </div>
    );
  }
);
