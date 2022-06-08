import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';
import classNames from 'classnames';
import { Link, useRouteMatch } from 'react-router-dom';
import { BaseUser } from '../../../@types/entities/BaseUser';
import { Specialization } from '../../../@types/entities/Specialization';
import { SpecializationOptions } from '../../MultiSelect/MultiSelect';

import { getMediaLink } from '../../../utils/mediaHelper';
import editIcon from '../../../assets/icons/edit.svg';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';

import s from './Card.module.scss';
import { SpecialistData } from '../../../pages/SpecialistProfile/Profile';

moment.locale('ru');

export interface Props {
  userData: BaseUser;
  specialistData?: SpecialistData;
  profilePhoto: string;
  isEditable: boolean;
}

export const ProfileCard = ({
  userData,
  specialistData,
  profilePhoto,
  isEditable,
}: Props) => {
  const { url } = useRouteMatch();
  const { name, lastname, patronymic, email, phone } = userData;

  const specializations =
    specialistData?.specializations
      .map(
        spec =>
          SpecializationOptions.find(option => option.value === spec.key)
            ?.label,
      )
      .filter(specialization => specialization)
      .join(', ') || [];

  return (
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
              src={getMediaLink(profilePhoto || '') || defaultAvatar}
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
            {specialistData?.experience && (
              <div className={s.profile__experience}>
                <p className={s.profile__experience_header}>Опыт работы:</p>
                <p>{specialistData.experience}</p>
              </div>
            )}
            {specialistData?.education && (
              <div className={s.profile__education}>
                <p className={s.profile__education_header}>Образование:</p>
                <p>{specialistData.education}</p>
              </div>
            )}
            {isEditable && (
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
  );
};
