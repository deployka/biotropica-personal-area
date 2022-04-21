import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SidebarSvgSelector } from '../../../../assets/icons/sidebar/SIdebarSvgSelector';
import { useModal } from '../../../../hooks/useModal';
import { Nav, Pages } from '../../../../layouts/PrivateLayout';
import { ModalName } from '../../../../providers/ModalProvider';
import { PopupBackground } from '../../PopupBackground/PopupBackground';

import defaultAvatar from './../../../../assets/images/profile/default_avatar.png';

import s from './SidebarMenuPopup.module.scss';

interface Props {
  nav: Nav[];
  onNavClick: (nav: Partial<Nav>) => void;
  openChat: () => void;
  logout: () => void;
  user: User | undefined;
  pages: Pages[];
  location: Location;
}

export const SidebarMenuPopup = ({
  nav,
  onNavClick,
  openChat,
  logout,
  user,
  pages,
  location,
}: Props) => {
  const { modals, closeModal } = useModal();

  return (
    <>
      <div onClick={() => closeModal(ModalName.MODAL_SIDEBAR_MENU)}>
        <PopupBackground open={modals.MODAL_SIDEBAR_MENU.open} />
      </div>
      <nav className={s.navPopup}>
        <div className={s.wrapper}>
          <Link
            to="/profile"
            onClick={() => {
              closeModal(ModalName.MODAL_SIDEBAR_MENU);
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
            {nav.map((item: Nav) => (
              <Link
                key={item.page + item.link}
                onClick={() => {
                  onNavClick(item);
                  closeModal(ModalName.MODAL_SIDEBAR_MENU);
                }}
                to={item.link}
                className={classNames(
                  item.link === '/' + location.pathname.split('/')[1]
                    ? s.active
                    : '',
                  s.link,
                )}
              >
                <div className={s.icon}>{item.svg}</div>
                <div className={s.text}>
                  <p>{item.page}</p>
                </div>
              </Link>
            ))}
            <div
              onClick={() => {
                openChat();
                closeModal(ModalName.MODAL_SIDEBAR_MENU);
              }}
              className={classNames(s.link)}
            >
              <div className={classNames(s.icon, s.chatIcon)}>
                <SidebarSvgSelector id="support" />
              </div>
              <div className={s.text}>
                <p>Чат поддержка</p>
              </div>
            </div>
            <div className={s.divider}></div>

            <button
              onClick={() => {
                logout();
                closeModal(ModalName.MODAL_SIDEBAR_MENU);
              }}
              className={s.link}
            >
              <div className={s.icon}>
                <SidebarSvgSelector id="logout" />
              </div>
              <div className={s.text}>
                <p>Выйти</p>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
