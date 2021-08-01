import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import s from './SidebarNotifications.module.scss';
import { BtnClose } from '../../buttons/BtnClose/BtnClose';
import { Notification } from './Notification/Notification';
interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarNotifications = ({ open, setOpen }: Props) => {
  const notifications = [
    {
      text: 'О нет! Вы забыли про задание',
      month: 'июня',
      day: '31',
      belate: '15',
      units: 'мин',
      taskLink: 'task32784712387123',
    },
    {
      text: 'О нет! Вы забыли про задание',
      month: 'апрель',
      day: '3',
      belate: '1',
      units: 'час',
      taskLink: 'task3223871223',
    },
    {
      text: 'О нет! Вы забыли про задание',
      month: 'сентября',
      day: '1',
      belate: '560',
      units: 'дн',
      taskLink: 'task32784712387123',
    },
    {
      text: 'О нет! Вы забыли про задание',
      month: 'марта',
      day: '1',
      belate: '15',
      units: 'дн',
      taskLink: 'task384712387123',
    },
  ];
  return (
    <div
      className={classNames({
        [s.sidebar__notifications__wrapper]: true,
        [s.open]: open,
      })}
    >
      <div className={s.sidebar__notifications}>
        <div className={s.sidebar__header}>
          <div className={s.sidebar__header__title}>Уведомления</div>
          <BtnClose />
        </div>
        <div className={s.notifications}>
          {notifications.map((notifications, index) => {
            return (
              <Notification
                key={index}
                options={{
                  text: notifications.text,
                  month: notifications.month,
                  day: notifications.day,
                  belate: notifications.belate,
                  units: notifications.units,
                  taskLink: notifications.taskLink,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
