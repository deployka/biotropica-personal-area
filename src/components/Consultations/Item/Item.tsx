import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Specialist as ISpecialist } from '../../../store/ducks/specialist/contracts/state';
import { getMediaLink } from '../../../utils/mediaHelper';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';
import { Button } from '../../../shared/Form/Button/Button';
import { Loader } from '../../../shared/Form/Loader/Loader';
import { FREE_CONSULTATIONS_COUNT } from '../../../constants/consultations';
import { useHistory } from 'react-router';

import s from './Item.module.scss';

interface Props {
  specialist: ISpecialist;
  searchQuery: string;
  isLoadingSignUp: boolean;
  onSignUpClick: (
    specialistId: number,
    userId: number,
    setClick: (click: boolean) => void,
  ) => void;
  consultationsCount: number;
}

export const ConsultationItem = ({
  specialist,
  searchQuery,
  onSignUpClick,
  isLoadingSignUp,
  consultationsCount,
}: Props) => {
  // FIXME: вынести логику из компонента
  const { experience, specializations, price, name, profilePhoto, id, userId } =
    specialist;

  const [click, setClick] = useState(false);
  const history = useHistory();

  function moveToSpecialist() {
    history.push('/specialists/' + userId);
  }

  // eslint-disable-next-line
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

    // eslint-disable-next-line
  }, [id, userId, click, onSignUpClick]);

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
  }, [price, consultationsCount, getMarkStringByValue]);

  return (
    <div className={s.specialist}>
      <div className={s.specialistInfo}>
        <div
          onClick={moveToSpecialist}
          className={s.photo}
          style={{
            backgroundImage: `url(${
              getMediaLink(profilePhoto) || defaultAvatar
            })`,
          }}
        />

        <div className={s.info}>
          <div className={s.name} onClick={moveToSpecialist}>
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
