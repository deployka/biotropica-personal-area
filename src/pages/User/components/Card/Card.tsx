import { Link } from 'react-router-dom';
import { User } from '../../../../store/ducks/user/contracts/state';

import s from './Card.module.scss';

import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';
import edit from '../../../../assets/icons/profile/edit.svg';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';
import { getMediaLink } from '../../../../utils/mediaHelper';
moment.locale('ru');
interface Props {
  user: User;
}

export const Card = ({ user }: Props) => {
  return (
    <div className={s.profile__card}>
      <div
        className={classNames({
          [s.profile__avatar__wrapper]: true,
          [s.paid]: true,
        })}
      >
        <img
          className={s.profile__avatar}
          src={
            (user?.profile_photo && getMediaLink(user.profile_photo)) ||
            defaultAvatar
          }
          alt=""
        />
      </div>
      <div className={s.profile__name}>
        <p>
          {user.lastname}
          {'  '}
          {user.name}
        </p>
      </div>
      <div className={s.profile__mail}>
        <p>{user.email}</p>
      </div>
      <div className={s.profile__phone}>
        <p>{user.phone}</p>
      </div>
      <div className={s.profile__birth}>
        <p>{user?.dob && moment(new Date(user?.dob || '')).format('LL')}</p>
      </div>
      <Link to="/profile/edit" className={s.profile__edit}>
        <div className={s.profile__editIcon}>
          <img src={edit} alt="редактировать" />
        </div>
        <span>редактировать</span>
      </Link>
    </div>
  );
};
