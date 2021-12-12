import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import s from './SpecialistsList.module.scss';
import { Specialist as ISpecialist } from '../../../../store/ducks/specialist/contracts/state';
import { Specialist } from './Specialist';

interface Props {
  specialists: ISpecialist[];
  searchQuery: string;
  onSignUpClick: (
    specialistId: number,
    userId: number,
    setClick: (click: boolean) => void
  ) => void;
  isLoadingSignUp: boolean;
  consultationsCount: number;
}

export const SpecialistsList = ({
  specialists,
  searchQuery,
  onSignUpClick,
  isLoadingSignUp,
  consultationsCount,
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

      <div className={s.list}>
        <PerfectScrollbar>
          {!!specialists.length &&
            specialists.map(specialist => (
              <Specialist
                consultationsCount={consultationsCount}
                isLoadingSignUp={isLoadingSignUp}
                onSignUpClick={onSignUpClick}
                key={specialist.id}
                specialist={specialist}
                searchQuery={searchQuery}
              />
            ))}
          {!specialists.length && <p>Специалисты не найдены</p>}
        </PerfectScrollbar>
      </div>
    </div>
  );
};
