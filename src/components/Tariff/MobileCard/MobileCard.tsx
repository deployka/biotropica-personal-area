import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import arrow from './../../../assets/icons/tariffs/arrow.svg';
import checkbox from './../../../assets/icons/tariffs/checkbox.svg';
import { selectIsAdmin } from '../../../store/slices/authSlice';
import EditTariffModal from '../EditModal/EditModal';
import Button from '../../Button/Button';
import { Tariff } from '../../../@types/entities/Tariff';

import s from './MobileCard.module.scss';
import { Loader } from '../../../shared/Form/Loader/Loader';
import classNames from 'classnames';

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
  const { id, cost, title, includedFields, zakazSystemId } = tariff;

  const [height, setHeight] = useState<number | string>(0);

  const [isEditTariffModalVisible, setIsEditTariffModalVisible] =
    useState(false);

  function toggle() {
    height === 0 ? setHeight('auto') : setHeight(0);
  }

  const isAdmin = useSelector(selectIsAdmin);

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
                className={classNames(
                  s.button,
                  isSelectLoading ? s.disabled : '',
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
                  'Продлить тариф'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <EditTariffModal
        id={id}
        zakazSystemId={zakazSystemId}
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
