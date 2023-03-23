import React from 'react';

import { useSelector } from 'react-redux';
import Button from '../../Button/Button';

import checkbox from './../../../assets/icons/tariffs/checkbox.svg';
import arrow from './../../../assets/icons/arrowLight.svg';

import { selectIsAdmin } from '../../../store/slices/authSlice';

import s from './Card.module.scss';
import { Tariff as ITariff } from '../../../@types/entities/Tariff';
import { Loader } from '../../../shared/Form/Loader/Loader';
import classNames from 'classnames';
import { useGetCurrentTariffQuery } from '../../../api/tariffs';

interface Props {
  tariff: ITariff;
  order: number;
  isEditableOrder: boolean;
  isSelectLoading?: boolean;
  onEdit: () => void;
  onSelect: () => void;
  onChangeOrder: (newPosition: number) => void;
}

const LEFT_STEP = -1;
const RIGHT_STEP = 1;

export const TariffCard = ({
  tariff,
  isEditableOrder,
  isSelectLoading,
  onEdit,
  onSelect,
  onChangeOrder,
}: Props) => {
  const { cost, title, includedFields } = tariff;

  const isAdmin = useSelector(selectIsAdmin);

  const { data: currentTariff } = useGetCurrentTariffQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const isPaid = currentTariff?.isPaid || false;
  const isCurrentTariff = currentTariff?.tariff?.title === title;

  const tariffBtnText =
    isCurrentTariff && !isPaid
      ? 'ожидает оплаты'
      : isPaid && isCurrentTariff
        ? 'тариф оплачен'
        : 'купить тариф';

  const isDisabledBtn = isPaid;

  return (
    <div className={s.card}>
      <div className={s.top}>
        <div className={s.header}>
          <div className={s.price}>
            <div className={s.text}>
              <p>{cost} ₽</p>
            </div>
            <div className={s.subText}>
              <p>/месяц</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className={s.title}>
          <h3>{title}</h3>
        </div>

        <ul className={s.list}>
          {includedFields.map((feature: string) => (
            <li key={feature} className={s.listEl}>
              <img src={checkbox} />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.bottom}>
        {isAdmin ? (
          <>
            {isEditableOrder && (
              <>
                <button
                  className={s.orderButton}
                  onClick={() => {
                    onChangeOrder(LEFT_STEP);
                  }}
                >
                  <img src={arrow} />
                </button>
                <button
                  className={classNames(s.orderButton, s.right)}
                  onClick={() => {
                    onChangeOrder(RIGHT_STEP);
                  }}
                >
                  <img src={arrow} />
                </button>
              </>
            )}
            <Button
              isFunctional
              className={classNames(s.editBtn, {
                [s.centered]: isEditableOrder,
              })}
              onClick={onEdit}
            >
              Редактировать
            </Button>
          </>
        ) : (
          <button
            disabled={isSelectLoading || isDisabledBtn}
            className={classNames(s.button, {
              [s.currentTariffBtn]: isCurrentTariff,
              [s.disabled]: isSelectLoading || isDisabledBtn,
            })}
            onClick={() => {
              !isSelectLoading && onSelect();
            }}
          >
            {isSelectLoading && isCurrentTariff ? (
              <Loader color="#6f61d0" />
            ) : (
              tariffBtnText
            )}
          </button>
        )}
      </div>
    </div>
  );
};
