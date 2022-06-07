import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import s from './SidebarNotifications.module.scss';
import { BtnClose } from '../../buttons/BtnClose/BtnClose';
import { Notification } from './Notification/Notification';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { PopupBackground } from '../PopupBackground/PopupBackground';
import { Notification as INotification } from '../../../@types/entities/Notification';
import { useGetNotificationsQuery } from '../../../api/notifications';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarNotifications = ({ open, setOpen }: Props) => {
  const { data: notifications = [] } = useGetNotificationsQuery();

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
