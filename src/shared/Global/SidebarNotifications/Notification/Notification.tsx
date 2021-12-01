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
      <div className={s.info}>
        <div className={s.text}>
          <p>
            {text} {moment(date).format('Do MMMM')}
          </p>
        </div>
        <div className={s.date}>
          <p>{moment(new Date(createdAt), 'YYYYMMDD').fromNow()}</p>
        </div>
      </div>
      <div className={s.actions}>
        <Link to={taskLink} className={s.link}>
          перейти к заданию
        </Link>
        <div className={s.delete}>
          <p>удалить</p>
        </div>
      </div>
    </div>
  );
};
