import React, { ReactNode } from 'react';
import { SpecialistProfile } from '../../../../../store/ducks/recommendation/contracts/state';
import s from './Recommendation.module.scss';

interface Props {
  profile: SpecialistProfile;
  children: ReactNode;
}

export const Profile = ({ children, profile }: Props) => {
  return (
    <div>
      <div className={s.card__header}>
        <div className={s.profile__avatar__wrapper}>
          <img src={profile.profile_photo} className={s.profile__avatar}></img>
        </div>
        <div className={s.profile__info}>
          <div className={s.profile__name}>{profile.name}</div>
          <div className={s.profile__post}>{profile.position}</div>
        </div>
        <a href={'/profiles/' + profile.id} className={s.profile__btn__wrapper}>
          <button className={s.profile__btn}>перейти в профиль</button>
        </a>
      </div>
      {children}
    </div>
  );
};
