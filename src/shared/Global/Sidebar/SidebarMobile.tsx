import classNames from 'classnames';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import s from './SidebarMobile.module.scss';

import { useModal } from '../../../hooks/useModal';
import { SidebarSvgSelector } from '../../../assets/icons/sidebar/SIdebarSvgSelector';
import { ModalName } from '../../../providers/ModalProvider';
import { Nav, Page } from '../../../layouts/PrivateLayout';
import { BaseUser } from '../../../@types/entities/BaseUser';

interface Props {
  onNavClick: (nav: Partial<Nav>) => void;
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  chatNotificationsOpen: boolean;
  isChatUnread: boolean;
  openChat: () => void;
  logout: () => void;
  pages: Page[];
  nav: Nav[];
  user: BaseUser | undefined;
}

export const SidebarMobile = memo(
  ({
    onNavClick,
    setSidebarChatOpen,
    setSidebarNotificationsOpen,
    isChatUnread,
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
          <div className={s.left}>
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
          </div>

          <div className={s.center}>
            <Link
              key={nav[0].page}
              onClick={() => onNavClick(nav[0])}
              to={nav[0].link}
              className={classNames(
                s.homeLink,
                nav[0].link === '/' + location.pathname.split('/')[1]
                  ? s.active
                  : '',
              )}
            >
              <div className={s.icon}>{nav[0].svg}</div>
            </Link>
          </div>

          <div className={s.right}>
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
                {isChatUnread ? (
                  <SidebarSvgSelector id="chat-active" />
                ) : (
                  <SidebarSvgSelector id="chat" />
                )}
              </div>
              <p>Входящие</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

SidebarMobile.displayName = 'SidebarMobile';
