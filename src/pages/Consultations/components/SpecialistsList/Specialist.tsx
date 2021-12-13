import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Specialist as ISpecialist } from '../../../../store/ducks/specialist/contracts/state';
import { getMediaLink } from '../../../../utils/mediaHelper';
import defaultAvatar from '../../../../assets/images/profile/default_avatar.png';
import s from './Specialist.module.scss';
import { Button } from '../../../../shared/Form/Button/Button';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { FREE_CONSULTATIONS_COUNT } from '../../../../constants/consultations';

interface Props {
  specialist: ISpecialist;
  searchQuery: string;
  isLoadingSignUp: boolean;
  onSignUpClick: (
    specialistId: number,
    userId: number,
    setClick: (click: boolean) => void
  ) => void;
  consultationsCount: number;
}

export const Specialist = ({
  specialist,
  searchQuery,
  onSignUpClick,
  isLoadingSignUp,
  consultationsCount,
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

  function getMarkStringByValue(value: string | number): ReactElement {
    value = String(value);
    const query: string = searchQuery.toLowerCase();
    const pos: number = value.toLowerCase().search(query);
    const length: number = query.length;

    if (pos === -1) return <>{value}</>;
    return (
      <>
        {value.slice(0, pos)}
        <mark>{value.slice(pos, pos + length)}</mark>
        {value.slice(pos + length)}
      </>
    );
  }
  const signUpClick = useCallback(() => {
    onSignUpClick(id, userId, (click: boolean) => {
      setClick(click);
    });
    setClick(true);
  }, [id, userId, click]);

  useEffect(() => {
    if (!isLoadingSignUp) {
      setClick(false);
    }
  }, [isLoadingSignUp]);

  const Price = useCallback(() => {
    if (consultationsCount >= FREE_CONSULTATIONS_COUNT) {
      return <>{getMarkStringByValue(price)} ₽</>;
    }
    return <>Бесплатно</>;
  }, [price, consultationsCount, FREE_CONSULTATIONS_COUNT]);

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
        <p>{<Price />}</p>
      </div>

      <div className={s.appointment}>
        <Button
          disabled={isLoadingSignUp || click}
          type="submit"
          onClick={signUpClick}
          options={{
            content: isLoadingSignUp && click ? <Loader /> : 'Записаться',
            setDisabledStyle: isLoadingSignUp || click,
          }}
        />
      </div>
    </div>
  );
};
