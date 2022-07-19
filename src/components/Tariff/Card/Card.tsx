import React from 'react';

import { useSelector } from 'react-redux';
import Button from '../../Button/Button';
import EditTariffModal from '../EditModal/EditModal';
import checkbox from './../../../assets/icons/tariffs/checkbox.svg';
import { selectIsAdmin } from '../../../store/slices/authSlice';

import s from './Card.module.scss';
import { Tariff as ITariff } from '../../../@types/entities/Tariff';
import { Loader } from '../../../shared/Form/Loader/Loader';
import classNames from 'classnames';
import { useGetCurrentTariffQuery } from '../../../api/tariffs';

interface Props {
  tariff: ITariff;
  refetchTariffs: () => void;
  isSelectLoading?: boolean;
  onSelect: () => void;
}

export const TariffCard = ({
  tariff,
  refetchTariffs,
  isSelectLoading,
  onSelect,
}: Props) => {
  const { id, cost, title, includedFields, zakazSystemId } = tariff;

  const [isEditTariffModalVisible, setIsEditTariffModalVisible] =
    React.useState(false);

  const isAdmin = useSelector(selectIsAdmin);

  const { data: currentTariff } = useGetCurrentTariffQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const isPaid = currentTariff?.isPaid || false;
  const isCurrentTariff = currentTariff?.tariff.title === title;

  const tariffBtnText =
    isCurrentTariff && !isPaid
      ? 'продлить тариф'
      : isPaid && isCurrentTariff
      ? 'тариф оплачен'
      : 'купить тариф';

  const isDisabledBtn = isPaid;

  return (
    <>
      <div className={s.card}>
        <div className={s.top}>
          <div className={s.header}>
            <div className={s.price}>
              <div className={s.text}>
                <p>{cost}₽</p>
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
                <img src={checkbox} alt="" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.bottom}>
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
                isCurrentTariff ? s.currentTariffBtn : '',
              )}
              onClick={() => {
                if (!isSelectLoading) {
                  onSelect();
                }
              }}
            >
              {isSelectLoading ? <Loader color="#6f61d0" /> : tariffBtnText}
            </button>
          )}
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
