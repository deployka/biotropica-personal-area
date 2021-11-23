import React, { useCallback, useEffect, useState } from 'react';
import { Specialist as ISpecialist } from '../../../../store/ducks/specialist/contracts/state';
import { getMediaLink } from '../../../../utils/mediaHelper';
import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';
import s from './Specialist.module.scss';
import { Button } from '../../../../shared/Form/Button/Button';
import { Loader } from '../../../../shared/Form/Loader/Loader';

interface Props {
  specialist: ISpecialist;
  searchQuery: string;
  isLoadingSignUp: boolean;
  onSignUpClick: (specialistId: number, userId: number) => void;
}

export const Specialist = ({
  specialist,
  searchQuery,
  onSignUpClick,
  isLoadingSignUp,
}: Props) => {
  const {
    experience,
    specializations,
    price,
    name,
    profile_photo,
    id,
    userId,
  } = specialist;

  const [click, setClick] = useState(false);

  function getMarkStringByValue(value: string | number) {
    value = String(value);
    const query: string = searchQuery.toLowerCase();
    const pos: number = value.toLowerCase().search(query);
    const length: number = query.length;

    if (pos === -1) return value;
    return (
      <>
        {value.slice(0, pos)}
        <mark>{value.slice(pos, pos + length)}</mark>
        {value.slice(pos + length)}
      </>
    );
  }
  const signUpClick = useCallback(() => {
    onSignUpClick(id, userId);
    setClick(true);
  }, [id, userId, click]);

  useEffect(() => {
    if (!isLoadingSignUp) {
      setClick(false);
    }
  }, [isLoadingSignUp]);

  return (
    <div className={s.specialist}>
      <div className={s.specialistInfo}>
        <div
          className={s.photo}
          style={{
            backgroundImage: `url(${
              getMediaLink(profile_photo) || defaultAvatar
            })`,
          }}
        ></div>

        <div className={s.info}>
          <div className={s.name}>
            <p> {getMarkStringByValue(name)}</p>
          </div>
          <div className={s.experience}>
            <p>стаж {getMarkStringByValue(experience)}</p>
          </div>
        </div>
      </div>

      <div className={s.specialization}>
        <p>{getMarkStringByValue(specializations)}</p>
      </div>

      <div className={s.price}>
        <p>{getMarkStringByValue(price)} ₽</p>
      </div>

      <div className={s.appointment}>
        <Button
          disabled={isLoadingSignUp}
          type="submit"
          onClick={signUpClick}
          options={{
            content: isLoadingSignUp && click ? <Loader /> : 'Записаться',
            setDisabledStyle: isLoadingSignUp,
          }}
        />
      </div>
    </div>
  );
};
