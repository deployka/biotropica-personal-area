import React from 'react';
import { Link } from 'react-router-dom';
import { SpecialistProfile as ISpecialistProfile } from '../../../../../store/ducks/recommendation/contracts/state';
import { getMediaLink } from '../../../../../utils/mediaHelper';
import s from './Recommendation.module.scss';

interface Props {
  profile: ISpecialistProfile;
}

export const SpecialistProfile = ({ profile }: Props) => {
  const photoLink = getMediaLink(profile.profile_photo);
  return (
    <div className={s.card__header}>
      <div className={s.profile__avatar__wrapper}>
        <img src={photoLink} className={s.profile__avatar}></img>
      </div>
      <div className={s.profile__info}>
        <div className={s.profile__name}>{profile.name}</div>
        <div className={s.profile__post}>{profile.position}</div>
      </div>
      <Link to={'/profiles/' + profile.id} className={s.profile__btn__wrapper}>
        <div className={s.profile__btn}>перейти в профиль</div>
      </Link>
    </div>
  );
};
