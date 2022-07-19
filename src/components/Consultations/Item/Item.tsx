import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import { getMediaLink } from '../../../utils/mediaHelper';
import defaultAvatar from '../../../assets/images/profile/default_avatar.png';
import { Button } from '../../../shared/Form/Button/Button';
import { Loader } from '../../../shared/Form/Loader/Loader';
import { useHistory } from 'react-router';

import s from './Item.module.scss';
import { Specialist } from '../../../@types/entities/Specialist';
import { formatSpecializationsToString } from '../../../utils/specialistHelper';
import { getFullName } from '../../../utils/getFullName';

interface Props {
  specialist: Specialist;
  searchQuery: string;
  isLoadingSignUp: boolean;
  onSignUpClick: (
    specialistId: number,
    userId: number,
    setClick: (click: boolean) => void,
  ) => void;
  restOfFreeConsultationsCount: number;
}

export const ConsultationItem = ({
  specialist,
  searchQuery,
  onSignUpClick,
  isLoadingSignUp,
  restOfFreeConsultationsCount,
}: Props) => {
  // FIXME: вынести логику из компонента
  const { experience, specializations, price, user, id } = specialist;

  const { name, lastname, profilePhoto, id: userId } = user;
  const fullName = getFullName(name, lastname);

  const [click, setClick] = useState(false);
  const history = useHistory();

  function moveToSpecialist() {
    history.push('/specialists/' + id);
  }

  // TODO: вынести в helper
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
  }, [id, userId, click, onSignUpClick]);

  useEffect(() => {
    if (!isLoadingSignUp) {
      setClick(false);
    }
  }, [isLoadingSignUp]);

  const Price = useCallback(() => {
    if (!restOfFreeConsultationsCount) {
      return <>{getMarkStringByValue(price)} ₽</>;
    }
    return <>Бесплатно</>;
  }, [price, restOfFreeConsultationsCount, getMarkStringByValue]);

  return (
    <div className={s.specialist}>
      <div className={s.specialistInfo}>
        <div
          onClick={moveToSpecialist}
          className={s.photo}
          style={{
            backgroundImage: `url(${
              getMediaLink(profilePhoto || '') || defaultAvatar
            })`,
          }}
        />

        <div className={s.info}>
          <div className={s.name} onClick={moveToSpecialist}>
            <p>{getMarkStringByValue(fullName)}</p>
          </div>
          <div className={s.experience}>
            <p>стаж {getMarkStringByValue(experience)}</p>
          </div>
        </div>
      </div>

      <div className={s.specialization}>
        <p>
          {getMarkStringByValue(formatSpecializationsToString(specializations))}
        </p>
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
