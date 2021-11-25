import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Goal as IGoal } from '../../../store/ducks/goal/contracts/state';
import { Goal } from '../components/Goal/Goal';

import s from './Goals.module.scss';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { useSelector } from 'react-redux';
import { selectGoalsData } from '../../../store/ducks/goals/selectors';

SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);

interface Props {
  active: number;
}

const ButtonAddGoal = memo(() => {
  return (
    <Link to={'/goals/add'} className={s.createBtn}>
      Создать новую цель
    </Link>
  );
});

export const Header = ({ active }: Props) => {
  const goals: IGoal[] = useSelector(selectGoalsData) || [];
  const sortGoals = [...goals].sort((a: IGoal, b: IGoal): any => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });

  return (
    <div className={s.header}>
      <div className={s.container}>
        {goals.length && (
          <Swiper
            watchOverflow={true}
            navigation={{
              prevEl: '.leftArrow',
              nextEl: '.rightArrow',
            }}
            spaceBetween={30}
            slidesPerView={goals.length <= 3 ? goals.length : 3}
            breakpoints={{
              '0': {
                slidesPerView: 1,
                pagination: true,
              },
              '600': {
                slidesPerView: 2,
              },
              '1180': {
                slidesPerView: 3,
              },
            }}
          >
            {sortGoals.map((goal: IGoal) => (
              <SwiperSlide key={goal.id}>
                <Goal active={active} goal={goal} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {goals.length > 3 && (
          <div>
            <div className={s.right + ' ' + 'rightArrow'}>
              <GlobalSvgSelector id="slider-right" />
            </div>
            <div className={s.left + ' ' + 'leftArrow'}>
              <GlobalSvgSelector id="slider-left" />
            </div>
            <div className={s.pagination + ' ' + 'pagination'}></div>
          </div>
        )}
      </div>
      <ButtonAddGoal />
    </div>
  );
};
