import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Link } from 'react-router-dom';
import { Goal as IGoal } from '../../../store/ducks/goal/contracts/state';

import s from './Goals.module.scss';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { Goal } from '../components/Goal/Goal';
import classNames from 'classnames';

SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);

interface Props {
  active: number;
  goals: IGoal[];
}

const ButtonAddGoal = memo(() => {
  return (
    <Link to={'/goals/add'} className={s.createBtn}>
      Создать новую цель
    </Link>
  );
});

ButtonAddGoal.displayName = 'ButtonAddGoal';

export const Header = ({ active, goals }: Props) => {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <Swiper
          watchOverflow={true}
          navigation={{
            prevEl: '.leftArrow',
            nextEl: '.rightArrow',
          }}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              pagination: {
                el: '.swiper-pagination-goals-header',
                type: 'bullets',
                clickable: true,
              },
            },
            600: {
              slidesPerView: 2,
            },
            1180: {
              slidesPerView: 3,
              width: 890,
            },
          }}
        >
          {goals.map((goal: IGoal) => (
            <SwiperSlide key={goal.id}>
              <Goal active={active} goal={goal} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={classNames({
            hide: goals.length <= 3,
          })}
        >
          <div className={classNames(s.right, 'rightArrow')}>
            <GlobalSvgSelector id="slider-right" />
          </div>
          <div className={classNames(s.left, 'leftArrow')}>
            <GlobalSvgSelector id="slider-left" />
          </div>
        </div>
        <div
          className={classNames(s.pagination, 'swiper-pagination-goals-header')}
        ></div>
      </div>
      <ButtonAddGoal />
    </div>
  );
};
