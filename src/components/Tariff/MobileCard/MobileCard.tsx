import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import arrow from './../../../assets/icons/tariffs/arrow.svg';
import checkbox from './../../../assets/icons/tariffs/checkbox.svg';
import { selectIsAdmin } from '../../../store/slices/authSlice';
import Button from '../../Button/Button';
import { Tariff } from '../../../@types/entities/Tariff';

import s from './MobileCard.module.scss';
import { Loader } from '../../../shared/Form/Loader/Loader';
import classNames from 'classnames';
import { useGetCurrentTariffQuery } from '../../../api/tariffs';

interface Props {
  tariff: Tariff;
  refetchTariffs(): void;
  isSelectLoading?: boolean;
  onSelect: () => void;
}

export const TariffMobileCard = ({
  tariff,
  refetchTariffs,
  isSelectLoading,
  onSelect,
}: Props) => {
  const { cost, title, includedFields } = tariff;

  const [height, setHeight] = useState<number | string>(0);

  const [isEditTariffModalVisible, setIsEditTariffModalVisible] =
    useState(false);

  const { data: currentTariff } = useGetCurrentTariffQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  function toggle() {
    height === 0 ? setHeight('auto') : setHeight(0);
  }

  const isAdmin = useSelector(selectIsAdmin);

  const isPaid = currentTariff?.isPaid || false;

  const isCurrentTariff = currentTariff?.tariff?.id === tariff.id;
  const tariffBtnText =
    isCurrentTariff && !isPaid
      ? 'ожидает оплаты'
      : isPaid
        ? 'действует'
        : 'купить тариф';

  const isDisabledBtn = isPaid;

  return (
    <>
      <div className={s.card}>
        <div className={s.title}>
          <h3>{title}</h3>
        </div>
        <div className={s.price}>
          <div className={s.text}>
            <p>{cost}₽</p>
          </div>
          <div className={s.subText}>
            <p>/месяц</p>
          </div>
        </div>

        <AnimateHeight
          duration={300}
          height={height} // see props documentation below
        >
          <ul className={s.list}>
            {includedFields.map((feature: string) => (
              <li key={feature} className={s.listEl}>
                <img src={checkbox} alt="" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </AnimateHeight>

        <div className={s.bottom}>
          <button
            className={s.hideBtn}
            onClick={() => {
              toggle();
            }}
          >
            {!height ? 'подробнее' : 'скрыть'}
            <img
              style={!height ? { transform: 'rotate(0)', top: '-1px' } : {}}
              src={arrow}
              alt=""
            />
          </button>
          <div className={s.editBtn}>
            {isAdmin ? (
              <Button
                isFunctional
                className={s.editBtn}
                onClick={() => setIsEditTariffModalVisible(true)}
              >
                Редактировать
              </Button>
            ) : (
              <button
                disabled={isSelectLoading || isDisabledBtn}
                className={classNames(
                  s.button,
                  isSelectLoading || isDisabledBtn ? s.disabled : '',
                )}
                onClick={() => {
                  if (!isSelectLoading) {
                    onSelect();
                  }
                }}
              >
                {isSelectLoading ? (
                  <Loader color="#6f61d0" />
                ) : (
                  tariffBtnText
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
