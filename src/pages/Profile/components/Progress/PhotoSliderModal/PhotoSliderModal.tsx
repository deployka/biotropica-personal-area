import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';

import s from './PhotoSliderModal.module.scss';
import classNames from 'classnames';

import { ProfileSvgSelector } from '../../../../../assets/icons/profile/ProfileSvgSelector';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { PopupBackground } from '../../../../../shared/Global/PopupBackground/PopupBackground';
import { useModal } from '../../../../../hooks/UseModal';
import { ModalName } from '../../../../../providers/ModalProvider';

SwiperCore.use([Navigation]);

export interface Photo {
  src: string;
  title: string;
}

interface Props {
  photos: Photo[];
}

export const PhotoSliderModal = ({ photos }: Props) => {
  const { modals, closeModal } = useModal();

  return (
    <>
      <div onClick={() => closeModal(ModalName.MODAL_PROGRESS_PHOTO_SLIDER)}>
        <PopupBackground open={modals.MODAL_PROGRESS_PHOTO_SLIDER.open} />
      </div>
      <div className={s.results}>
        <div className={s.results__container}>
          <div className={s.results__closebtn}>
            <button
              onClick={() => closeModal(ModalName.MODAL_PROGRESS_PHOTO_SLIDER)}
            >
              <ProfileSvgSelector id="close" />
            </button>
          </div>
          <Swiper
            slidesPerView={1}
            navigation={{
              prevEl: '.left',
              nextEl: '.right',
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className={s.results_slider}
          >
            {photos?.map((photo: Photo, i: number) => {
              return (
                <SwiperSlide
                  className={s.results_slider_item}
                  key={i + photo.title}
                >
                  <img src={photo.src} alt={photo.title} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className={classNames(s.right, 'right')}>
            <GlobalSvgSelector id="slider-right" />
          </div>
          <div className={classNames(s.left, 'left')}>
            <GlobalSvgSelector id="slider-left" />
          </div>
          <div className={s.results_date}>
            <p> спустя 5 дней, 13 июня 2021г.</p>
          </div>
        </div>
      </div>
    </>
  );
};
