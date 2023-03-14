import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Specialist } from '../../../@types/entities/Specialist';

import { ConsultationItem } from '../Item/Item';

import s from './List.module.scss';

interface Props {
  specialists: Specialist[];
  searchQuery: string;
  onSignUpClick: (
    specialistId: number,
    userId: number,
    setClick: (click: boolean) => void,
  ) => void;
  isLoadingSignUp: boolean;
  restOfFreeConsultationsCount: number;
}

export const ConsultationsList = ({
  specialists,
  searchQuery,
  onSignUpClick,
  isLoadingSignUp,
  restOfFreeConsultationsCount,
}: Props) => {
  return (
    <div className={s.specialistList}>
      <div className={s.title}>
        <div className={s.name}>
          <p>ФИО специалиста</p>
        </div>
        <div className={s.specialization}>
          <p>Специализация</p>
        </div>
        <div className={s.price}>
          <p>Стоимость</p>
        </div>
        <div className={s.appointment}>
          <p>Запись</p>
        </div>
      </div>

      <PerfectScrollbar>
        <div className={s.list}>
          {!!specialists.length &&
            specialists.map(specialist => (
              <ConsultationItem
                restOfFreeConsultationsCount={restOfFreeConsultationsCount}
                isLoadingSignUp={isLoadingSignUp}
                onSignUpClick={onSignUpClick}
                key={specialist.id}
                specialist={specialist}
                searchQuery={searchQuery}
              />
            ))}
          {!specialists.length && <p>Специалисты не найдены</p>}
        </div>
      </PerfectScrollbar>
    </div>
  );
};
