import moment from 'moment';
import { Link } from 'react-router-dom';
import { Notification as INotification } from '../../../../store/ducks/notification/contracts/state';
import s from './Notification.module.scss';

interface Props {
  notification: INotification;
}

export const Notification = ({ notification }: Props) => {
  const { text, date, taskLink, createdAt } = notification;
  return (
    <div className={s.notification}>
      <div className={s.notification__info}>
        <div className={s.notification__text}>
          {text}
          {'   '}
          <span className={s.date__month}>
            {moment(date).format('Do MMMM')}
          </span>
        </div>
        <div className={s.date__belate}>
          {moment(new Date(createdAt), 'YYYYMMDD').fromNow()}
        </div>
      </div>
      <div className={s.notification__actions}>
        <Link to={taskLink} className={s.notification__link}>
          перейти к заданию
        </Link>
        <div className={s.notification__delete}>удалить</div>
      </div>
    </div>
  );
};
