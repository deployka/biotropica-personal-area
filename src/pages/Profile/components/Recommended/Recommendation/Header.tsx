import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpecialistProfile as ISpecialistProfile } from '../../../../../store/ducks/recommendation/contracts/state';
import { getMediaLink } from '../../../../../utils/mediaHelper';

import defaultAvatar from '../../../../../assets/images/profile/default_avatar.png';

import s from './Recommendation.module.scss';
import { emitAppModuleEvent } from '../../../../../services/AppModuleService';

interface Props {
  profile: ISpecialistProfile;
}

export const Header = ({ profile }: Props) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (document.documentElement.clientWidth <= 800) {
      setMobile(true);
    }
  }, []);

  const photoLink = getMediaLink(profile.profilePhoto);
  return (
    <div className={s.header}>
      <div className={s.specialist}>
        <div className={s.avatar}>
          <img src={photoLink || defaultAvatar}></img>
        </div>
        <div className={s.specialistInfo}>
          <div className={s.name}>
            <p>{profile.name}</p>
          </div>
          <div className={s.specialization}>
            <p>{profile.position}</p>
          </div>
        </div>
      </div>
      {/* TODO: вернуть ссылку */}
      {/* <Link */}
      {/*    to={'/specialists/' + profile.id} */}
      {/*    className={s.button} */}
      {/* > */}
      {/*  <p>{mobile ? 'профиль' : 'перейти в профиль'}</p> */}
      {/* </Link> */}
    </div>
  );
};
