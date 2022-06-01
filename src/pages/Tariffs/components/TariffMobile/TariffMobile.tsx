import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { Tariff } from '../../../../store/rtk/types/tariff';
import arrow from './../../../../assets/icons/tariffs/arrow.svg';
import checkbox from './../../../../assets/icons/tariffs/checkbox.svg';
import { selectUserRoles } from '../../../../store/rtk/slices/authSlice';
import EditTariffModal from '../EditTariffModal/EditTariffModal';
import Button from '../../../../components/Button/Button';

import s from './TariffMobile.module.scss';

interface Props {
  tariff: Tariff;
  refetchTariffs(): void;
}

export const TariffMobile = (props: Props) => {
  const { id, cost, title, includedFields } = props.tariff;

  const refetchTariffs = props.refetchTariffs;

  const [height, setHeight] = useState<number | string>(0);

  const [isEditTariffModalVisible, setIsEditTariffModalVisible] =
    useState(false);

  function toggle() {
    height === 0 ? setHeight('auto') : setHeight(0);
  }

  const roles = useSelector(selectUserRoles);

  const isAdmin = roles.includes('ADMIN');

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
            {!isAdmin ? (
              <Button
                isFunctional
                className={s.editBtn}
                onClick={() => setIsEditTariffModalVisible(true)}
              >
                Редактировать
              </Button>
            ) : (
              <a href="#" className={s.button}>
                <button>продлить тариф</button>
              </a>
            )}
          </div>
        </div>
      </div>
      <EditTariffModal
        id={id}
        cost={cost}
        title={title}
        includedFields={includedFields}
        isVisible={isEditTariffModalVisible}
        refetchTariffs={refetchTariffs}
        onClose={() => setIsEditTariffModalVisible(false)}
      />
    </>
  );
};
