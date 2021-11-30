import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeaderSvgSelector } from '../../../../assets/icons/header/HeaderSvgSelector';
import { useModal } from '../../../../hooks/useModal';
import { Pages } from '../../../../layouts/PrivateLayout';
import { ModalName } from '../../../../providers/ModalProvider';
import { PopupBackground } from '../../PopupBackground/PopupBackground';

import defaultAvatar from './../../../../assets/images/profile/default_avatar.png';

import s from './SidebarNotificationsPopup.module.scss';

interface Props {
  setSidebarChatOpen: Dispatch<SetStateAction<boolean>>;
  setSidebarNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<string>>;
  user: User | undefined;
  pages: Pages[];
  location: any;
}

export const SidebarNotificationsPopup = ({
  setSidebarChatOpen,
  setSidebarNotificationsOpen,
  setPage,
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
              onClick={() => setPage('Профиль')}
            >
              <div
                className={s.img}
                style={{
                  backgroundImage: `url(${
                    (user?.profile_photo &&
                      process.env.REACT_APP_BACKEND_URL +
                        '/' +
                        user?.profile_photo) ||
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
                <p>Сообщения</p>
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
                <p>Уведомления</p>
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