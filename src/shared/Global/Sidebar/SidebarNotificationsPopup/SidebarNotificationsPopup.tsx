import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { HeaderSvgSelector } from '../../../../assets/icons/header/HeaderSvgSelector';
import { useModal } from '../../../../hooks/useModal';
import { Nav, Page } from '../../../../layouts/PrivateLayout';
import { ModalName } from '../../../../providers/ModalProvider';
import { PopupBackground } from '../../PopupBackground/PopupBackground';
import { Client } from '../../../../@types/entities/Client';

import defaultAvatar from './../../../../assets/images/profile/default_avatar.png';

import s from './SidebarNotificationsPopup.module.scss';
import { BaseUser } from '../../../../@types/entities/BaseUser';

interface Props {
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  onNavClick: (nav: Partial<Nav>) => void;
  user: BaseUser | undefined;
  pages: Page[];
  location: Location;
}

export const SidebarNotificationsPopup = ({
  setSidebarChatOpen,
  setSidebarNotificationsOpen,
  onNavClick,
  user,
  pages,
  location,
}: Props) => {
  const { modals, closeModal } = useModal();

  const notifications = [1];
  const messages = [];

  return (
    <>
      <div onClick={() => closeModal(ModalName.MODAL_NOTIFICATIONS_MENU)}>
        <PopupBackground open={modals.MODAL_NOTIFICATIONS_MENU.open} />
      </div>
      <nav className={s.notificationsPopup}>
        <div className={s.wrapper}>
          <Link
            to="/profile"
            onClick={() => {
              closeModal(ModalName.MODAL_NOTIFICATIONS_MENU);
            }}
            className={s.profile}
          >
            <div
              className={classNames({
                [s.avatar]: true,
                [s.active]:
                  pages[0].link === '/' + location.pathname.split('/')[1],
              })}
              onClick={() => onNavClick({ ...pages[0] })}
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
            </div>
            <p>
              {user?.name} {user?.lastname}
            </p>
          </Link>
          <div className={s.linksList}>
            <div
              onClick={() => setSidebarNotificationsOpen(true)}
              className={s.link}
            >
              <div className={s.description}>
                <div className={s.icon}>
                  <HeaderSvgSelector id="notification" />
                </div>
                <p>Уведомления</p>
              </div>
              <div className={s.counter}>
                <p>{messages.length}</p>
              </div>
            </div>
            <div onClick={() => setSidebarChatOpen(true)} className={s.link}>
              <div className={s.description}>
                <div className={s.icon}>
                  <HeaderSvgSelector id="chat" />
                </div>
                <p>Сообщения</p>
              </div>
              <div className={s.counter}>
                <p>{notifications.length}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
