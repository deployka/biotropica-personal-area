import React from 'react';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/swiper.scss';
import classNames from 'classnames';

import { ProfileSvgSelector } from '../../../assets/icons/profile/ProfileSvgSelector';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/mediaHelper';
import { ProgressPhoto } from '../../../@types/entities/Progress';

import s from './PhotoSliderModal.module.scss';
import Modal from '../../../shared/Global/Modal/Modal';

SwiperCore.use([Navigation]);

type Props = {
  isOpened: boolean;
  photos: ProgressPhoto[];
  createdAt?: string;
  openedPhotoIndex?: number;
  onClose: () => void;
};

export const PhotoSliderModal = ({
  photos,
  isOpened,
  createdAt,
  openedPhotoIndex = 0,
  onClose,
}: Props) => {
  return (
    <Modal isOpened={isOpened} close={onClose} className={s.modal}>
      <div className={s.container}>
        <div className={s.closeBtn}>
          <button onClick={onClose}>
            <ProfileSvgSelector id="close" />
          </button>
        </div>
        <div className={s.slider}>
          <Swiper
            initialSlide={openedPhotoIndex}
            slidesPerView={1}
            spaceBetween={50}
            navigation={{
              prevEl: '.left',
              nextEl: '.right',
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className={s.slider}
          >
            {photos?.map((photo: ProgressPhoto, i: number) => {
              return (
                <SwiperSlide className={s.sliderItem} key={i + photo.filename}>
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
        {createdAt && (
          <div className={s.date}>
            <p>
              {moment(new Date(createdAt), 'YYYYMMDD').fromNow()},{' '}
              {moment(createdAt).format('Do MMMM YYYY г.')}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
