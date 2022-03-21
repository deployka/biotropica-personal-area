import classNames from 'classnames';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import s from './SidebarMobile.module.scss';

import { useModal } from '../../../hooks/UseModal';
import { SidebarSvgSelector } from '../../../assets/icons/sidebar/SIdebarSvgSelector';
import { ModalName } from '../../../providers/ModalProvider';
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

export const SidebarMobile = memo(
  ({
    onNavClick,
    setSidebarChatOpen,
    setSidebarNotificationsOpen,
    pages,
    nav,
    openChat,
    logout,
    user,
  }: Props) => {
    const { openModal } = useModal();

    return (
      <div className={s.sidebar}>
        <div className={s.wrapper}>
          <div
            className={s.menu}
            onClick={() =>
              openModal(ModalName.MODAL_SIDEBAR_MENU, {
                nav,
                onNavClick,
                openChat,
                logout,
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
            onClick={() => onNavClick(nav[0])}
            to={nav[0].link}
            className={classNames(
              s.homeLink,
              nav[0].link === '/' + location.pathname.split('/')[1] ? s.active : '',
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
                onNavClick,
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
  },
);

SidebarMobile.displayName = 'SidebarMobile';
