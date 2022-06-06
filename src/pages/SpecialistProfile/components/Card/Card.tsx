import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';
import classNames from 'classnames';
import { Link, useRouteMatch } from 'react-router-dom';

import s from './Card.module.scss';

import editIcon from '../../../../assets/icons/edit.svg';
import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';
import { SpecializationOptions } from '../../../../components/MultiSelect/MultiSelect';
import { useRequestAvatarFileQuery } from '../../../../store/rtk/requests/avatar';
import { User } from '../../../../store/@types/User';
import { getMediaLink } from '../../../../utils/mediaHelper';
import { useRequestUserDataQuery } from '../../../../store/rtk/requests/user';

moment.locale('ru');

export interface Props {
  user: User;
}

const Card = ({ user }: Props) => {
  const {
    id,
    email,
    name,
    phone,
    profilePhoto,
    lastname,
    patronymic,
    specialist,
  } = user;

  const { url } = useRouteMatch();

  const { isLoading } = useRequestAvatarFileQuery(profilePhoto);

  const { data: currentUser } = useRequestUserDataQuery();

  const specializations =
    !!specialist &&
    specialist.specializations
      .map(
        spec =>
          SpecializationOptions.find(option => option.value === spec.key)
            ?.label,
      )
      .filter(specialization => specialization)
      .join(', ');

  return (
    <>
      <div className={s.user}>
        <div>
          <div className={s.profile__card}>
            <div
              className={classNames({
                [s.profile__avatar__wrapper]: true,
                [s.paid]: true,
                [s.profile__user__avatar__wrapper]: !!profilePhoto,
              })}
            >
              <img
                id="card_avatar"
                className={s.profile__avatar}
                src={getMediaLink(profilePhoto) || defaultAvatar}
                alt="avatar"
              />
            </div>
            <div className={s.profile__data}>
              {!!specializations && (
                <div className={s.profile__specializations}>
                  {specializations}
                </div>
              )}
              <div className={s.profile__name}>
                <p>
                  {lastname} {name}
                </p>
                <p>{patronymic}</p>
              </div>
              <div className={s.profile__mail}>
                <p>{email}</p>
              </div>
              <div className={s.profile__phone}>
                <p>{phone}</p>
              </div>
              {specialist && specialist.experience && (
                <div className={s.profile__experience}>
                  <p className={s.profile__experience_header}>Опыт работы:</p>
                  <p>{specialist.experience}</p>
                </div>
              )}
              {specialist && specialist.education && (
                <div className={s.profile__education}>
                  <p className={s.profile__education_header}>Образование:</p>
                  <p>{specialist.education}</p>
                </div>
              )}
              {id === currentUser.id && (
                <Link className={s.profile__edit} to={`${url}/edit`}>
                  <div className={s.profile__editIcon}>
                    <img src={editIcon} alt="редактировать" />
                  </div>
                  <span>редактировать</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
