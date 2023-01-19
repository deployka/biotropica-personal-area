import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';

import { Link } from 'react-router-dom';

import type { BaseUser } from '../../../@types/entities/BaseUser';

import { getMediaLink } from '../../../utils/mediaHelper';
import { SpecialistData } from '../../../pages/SpecialistProfile/Profile';

import editIcon from '../../../assets/icons/edit.svg';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';
import s from './SpecialistCard.module.scss';
import { getSpecializationsString } from '../../../utils/getSpecializationsString';

moment.locale('ru');

export interface Props {
  user: BaseUser;
  specialistData?: SpecialistData;
  profilePhoto: string;
  isPublic: boolean;
  onEditClick: () => void;
}

export const SpecialistCard = ({
  user,
  specialistData,
  isPublic,
  onEditClick,
}: Props) => {
  const { name, lastname, patronymic, email, phone } = user;

  const specializations = getSpecializationsString(
    specialistData?.specializations || [],
  );

  return (
    <div className={s.card}>
      <div className={s.avatar}>
        <img
          src={
            (user?.profilePhoto && getMediaLink(user.profilePhoto)) ||
            defaultAvatar
          }
          alt="avatar"
        />
      </div>

      {!!specializations && (
        <div className={s.specializations}>{specializations}</div>
      )}
      <div className={s.name}>
        {lastname} {name} {patronymic}
      </div>
      <div className={s.line}>{email}</div>
      <div className={s.line}>{phone}</div>
      {specialistData?.experience && (
        <div className={s.line}>
          <p className={s.title}>Опыт работы:</p>
          <p className={s.text}>{specialistData.experience}</p>
        </div>
      )}
      {specialistData?.education && (
        <div className={s.line}>
          <p className={s.title}>Образование:</p>
          <p className={s.text}>{specialistData.education}</p>
        </div>
      )}
      {!isPublic && (
        // <p className={s.edit} onClick={onEditClick}>
        //   <div className={s.editIcon}>
        //     <img src={editIcon} alt="редактировать" />
        //   </div>
        //   <span>редактировать</span>
        // </p>
        <Link to="/profile/edit">
          <p className={s.edit} >
            <div className={s.editIcon}>
              <img src={editIcon} alt="редактировать" />
            </div>
            <span>редактировать</span>
          </p>
        </Link>
      )}
    </div>
  );
};
