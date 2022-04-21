import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';

import s from './PhotoSliderModal.module.scss';
import classNames from 'classnames';

import { ProfileSvgSelector } from '../../../../../assets/icons/profile/ProfileSvgSelector';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { PopupBackground } from '../../../../../shared/Global/PopupBackground/PopupBackground';
import { useModal } from '../../../../../hooks/useModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import { Photo } from '../../../../../store/ducks/progress/contracts/state';
import moment from 'moment';
import { getMediaLink } from '../../../../../utils/mediaHelper';

SwiperCore.use([Navigation]);

interface Props {
  photos: Photo[];
  createdAt: Date;
  i?: number;
}

export const PhotoSliderModal = ({ photos, createdAt, i }: Props) => {
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
          <div className={s.slider}>
            <Swiper
              initialSlide={i}
              slidesPerView={1}
              spaceBetween={50}
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
                    key={i + photo.filename}
                  >
                    <img src={getMediaLink(photo.filename)} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className={classNames(s.right, 'right')}>
            <GlobalSvgSelector id="slider-right" />
          </div>
          <div className={classNames(s.left, 'left')}>
            <GlobalSvgSelector id="slider-left" />
          </div>
          <div className={s.results_date}>
            <p>
              {moment(new Date(createdAt), 'YYYYMMDD').fromNow()},{' '}
              {moment(createdAt).format('Do MMMM YYYY г.')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
