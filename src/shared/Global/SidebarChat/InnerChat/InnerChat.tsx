import classNames from 'classnames';
import React from 'react';
import s from './InnerChat.module.scss';
import { BtnClose } from '../../../buttons/BtnClose/BtnClose';
import { BtnBack } from '../../../buttons/BtnBack/BtnBack';
import { Message } from './Message/Message';
import testImg1 from '../../../../assets/images/test/bg.png';
import testImg2 from '../../../../assets/images/test/0UWwSriFOJY.jpg';
import testImg3 from '../../../../assets/images/test/aMAX0OFJu1ePT_hBY1gl6SjgMT-V1qDGEYii0RGE91Lhzthhgyr5aurONBrIdFNblLopYRbpT6tnVy7DZDQicO1-.jpg';
import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';

interface Props {
  options: any;
}

export const InnerChat = ({ options }: Props) => {
  return (
    <div className={s.inner__chat}>
      <div className={s.chat__header}>
        <div className={s.btn__back}>
          <BtnBack />
        </div>
        <div className={s.chat__header__profile}>
          <div className={s.profile__avatar__wrapper}>
            <img src={options.image} className={s.profile__avatar}></img>
          </div>
          <div className={s.profile__info}>
            <div className={s.profile__name}>{options.name}</div>
            <div className={s.profile__post}>{options.post}</div>
          </div>
        </div>
        <div className={s.btn__close}>
          {/* <BtnClose  setOpen={setOpen}/> */}
        </div>
      </div>
      <div className={s.messages}>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__text)}>
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <img
          src={testImg2}
          className={classNames(
            s.message,
            s.message__type__image,
            s.new__branch
          )}
        />
        <div
          className={classNames(
            s.message,
            s.message__type__document,
            s.by__user
          )}
        >
          <a className={s.message__type__document__top}>
            <div className={s.document__img__wrapper}>
              <div className={s.document__img}>
                <GlobalSvgSelector id="document" />
              </div>
            </div>
            <div className={s.document__name}>Упражнения</div>
          </a>
          <div className={s.message__type__document__bot}>
            <div className={s.document__size}>
              2.5 <span className={s.document__size__units}>MB</span>
            </div>
            <div className={s.document__extension}>PDF</div>
            <div
              className={classNames(s.message__time, s.message__time__document)}
            >
              14:14
            </div>
          </div>
        </div>
        <div
          className={classNames(
            s.message,
            s.message__type__text,
            s.by__user,
            s.new__branch
          )}
        >
          Добрый день! Как ваши тренировки? я обосрался жидко
          <div className={classNames(s.message__time, s.message__time__text)}>
            14:14
          </div>
        </div>
        <div className={classNames(s.message, s.message__type__document)}>
          <a className={s.message__type__document__top}>
            <div className={s.document__img__wrapper}>
              <div className={s.document__img}>
                <GlobalSvgSelector id="document" />
              </div>
            </div>
            <div className={s.document__name}>Упражнения</div>
          </a>
          <div className={s.message__type__document__bot}>
            <div className={s.document__size}>
              2.5 <span className={s.document__size__units}>MB</span>
            </div>
            <div className={s.document__extension}>PDF</div>
            <div
              className={classNames(s.message__time, s.message__time__document)}
            >
              14:14
            </div>
          </div>
        </div>

        <div className={classNames(s.message, s.message__type__typing)}>
          Печатает...
        </div>
      </div>
      <form action="" className={s.chat__footer__form}>
        <div className={s.attach__popup}>
          <div className={s.attach__popup__media}>
            <div className={s.popup__icon}>
              <GlobalSvgSelector id="media" />
            </div>
            <div className={s.popup__text}>фото или видео</div>
            <input
              accept=".png, .jpg, .jpeg, .webp, .mp4, .mov, .webm, .avi, .gif"
              type="file"
              className={s.popup__input}
            />
          </div>
          <div className={s.attach__popup__documents}>
            <div className={s.popup__icon}>
              <GlobalSvgSelector id="document" />
            </div>
            <div className={s.popup__text}>документы</div>
            <input type="file" className={s.popup__input} />
          </div>
        </div>

        <div className={s.form__text__wrapper}>
          <textarea rows={10} className={s.form__text} name="" id=""></textarea>
          <div className={s.form__smile__btn}>
            <div className={s.form__submit__btn__img}>
              <GlobalSvgSelector id="smile" />
            </div>
          </div>
          <div className={s.form__attach__btn}>
            <div className={s.form__submit__btn__img}>
              <GlobalSvgSelector id="attach" />
            </div>
          </div>
        </div>
        <button type="submit" className={s.form__submit__btn}>
          <div className={s.form__submit__btn__img}>
            <GlobalSvgSelector id="send" />
          </div>
        </button>
      </form>
    </div>
  );
};
