import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';
import classNames from 'classnames';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import s from './Card.module.scss';

import editIcon from '../../../../assets/icons/edit.svg';
import defaultAvatar from '../../../../assets/icons/default_avatar.png';
import { User } from '../../../../store/rtk/types/user';
import { RootState } from '../../../../store/store';
import { SpecializationOptions, SpecializationOption } from '../../../../components/MultiSelect/MultiSelect';
import { useRequestAvatarFileQuery } from '../../../../store/rtk/requests/avatar';
import { Loader } from '../../../../shared/Global/Loader/Loader';

moment.locale('ru');

export interface Props {
  user: User;
}

const Card = (props: Props) => {
  const {
    id,
    email,
    name,
    phone,
    profilePhoto,
    lastname,
    patronymic,
    specialist,
  } = props.user;

  const { path, url } = useRouteMatch();

  const { data, isLoading, isSuccess } = useRequestAvatarFileQuery(profilePhoto);

  const currentUser = useSelector((state: RootState) => state.user.user);

  const specializations = !!specialist && specialist.specializations.map((spec: string) => (
    SpecializationOptions.find(option => option.value === spec)
  ));

  if (!currentUser) {
    return <div></div>;
  }

  return (
    <>
      {isLoading && <Loader />}
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
                id='card_avatar'
                className={s.profile__avatar}
                src={
                  (!!profilePhoto && isSuccess) || isLoading
                    ? 'https://master.bio-specialist.devshift.ru/api/static/' + profilePhoto
                    : defaultAvatar
                }
                alt=''
              />
            </div>
            <div className={s.profile__data}>
              {
                !!specializations &&
                  <div className={s.profile__specializations}>
                    {specializations.map((spec: SpecializationOption | undefined) => spec?.label).join(', ')}
                  </div>
              }
              <div className={s.profile__name}>
                <p>
                  {lastname}
                  {'  '}
                  {name}
                </p>
                <p>
                  {patronymic}
                </p>
              </div>
              <div className={s.profile__mail}>
                <p>{email}</p>
              </div>
              <div className={s.profile__phone}>
                <p>{phone}</p>
              </div>
              {
                specialist && specialist.experience &&
                  <div className={s.profile__experience}>
                    <p className={s.profile__experience_header}>
                      Опыт работы:
                    </p>
                    <p>
                      {specialist.experience}
                    </p>
                  </div>
              }
              {
                specialist && specialist.education &&
                  <div className={s.profile__education}>
                    <p className={s.profile__education_header}>
                      Образование:
                    </p>
                    <p>
                      {specialist.education}
                    </p>
                  </div>
              }
              {
                id === currentUser.id &&
                  <Link className={s.profile__edit} to={`${url}/edit`}>
                    <div className={s.profile__editIcon}>
                      <img src={editIcon} alt='редактировать' />
                    </div>
                    <span>редактировать</span>
                  </Link>
              }
            </div>
          </div>
          {/* <Link style={{ textDecoration: 'none' }} to='/goals'>
            <div className={s.goals}>
              <span>Активных целей: </span>
              {goalsCount}
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/tariffs'>
            <div className={s.tariff}>
              <div className={s.tariff__name}>
                Тариф {'  '}
                {tariffData.name}
              </div>
              <div className={s.tariff__expires}>
                до {'  '}
                {tariffData.expires}
              </div>
            </div>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Card;
