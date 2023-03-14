import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import s from './SidebarNotifications.module.scss';
import { BtnClose } from '../../buttons/BtnClose/BtnClose';
import { Notification } from './Notification/Notification';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { PopupBackground } from '../PopupBackground/PopupBackground';
import CloseIcon from './../../../assets/icons/close-light.svg';
import { Notification as INotification } from '../../../@types/entities/Notification';
import { useGetNotificationsQuery } from '../../../api/notifications';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onChangeNotification(isNotificationsUnread: boolean): void;
}

export const SidebarNotifications = (
  { open, setOpen, onChangeNotification }: Props) => {
  const { data: notifications = [] } = useGetNotificationsQuery();
  const close = () => {
    setOpen(false);
  };
  onChangeNotification(!!notifications.length);
  return (
    <>
      <div onClick={() => setOpen(false)}>
        <PopupBackground open={open} />
      </div>
      <div
        className={classNames({
          [s.sidebarNotifications]: true,
          [s.open]: open,
        })}
      >
        <div className={s.header}>
          <div className={s.title}>
            <p>Уведомления</p>
          </div>
          <button className={s.closeBtn} onClick={close}>
            <img src={CloseIcon} alt="close" />
          </button>
        </div>
        <div className={s.notifications}>
          {!notifications.length && 'Список уведомлений пуст'}
          <PerfectScrollbar>
            {!!notifications.length &&
              notifications.map((notification: INotification, i: number) => {
                return (
                  <Notification
                    key={i + notification.id}
                    notification={notification}
                  />
                );
              })}
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
};
