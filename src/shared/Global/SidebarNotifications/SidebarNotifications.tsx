import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import s from './SidebarNotifications.module.scss';
import { BtnClose } from '../../buttons/BtnClose/BtnClose';
import { Notification } from './Notification/Notification';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { PopupBackground } from '../PopupBackground/PopupBackground';
import NotificationService from '../../../services/NotificationService';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarNotifications = ({ open, setOpen }: Props) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    NotificationService.getAll().then(notifications =>
      setNotifications(notifications),
    );
  }, []);
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
          <BtnClose setOpen={setOpen} />
        </div>
        <PerfectScrollbar>
          <div className={s.notifications}>
            {notifications.map((notification: INotification, i: number) => {
              return (
                <Notification
                  key={i + notification.id}
                  notification={notification}
                />
              );
            })}
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
};
