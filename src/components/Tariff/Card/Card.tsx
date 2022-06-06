import React from 'react';

import { useSelector } from 'react-redux';
import Button from '../../Button/Button';
import EditTariffModal from '../EditModal/EditModal';
import checkbox from './../../../assets/icons/tariffs/checkbox.svg';
import { Tariff as ITariff } from '../../../store/rtk/types/tariff';
import { selectUserRoles } from '../../../store/slices/authSlice';
import { ROLE } from '../../../store/rtk/types/user';

import s from './Card.module.scss';

interface Props {
  tariff: ITariff;
  refetchTariffs(): void;
}

export const TariffCard = (props: Props) => {
  const { id, cost, title, includedFields } = props.tariff;

  const refetchTariffs = props.refetchTariffs;

  const [isEditTariffModalVisible, setIsEditTariffModalVisible] =
    React.useState(false);

  const roles = useSelector(selectUserRoles);

  const isAdmin = roles.includes(ROLE.ADMIN);

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
            <a href="#" className={s.button}>
              <button>продлить тариф</button>
            </a>
          )}
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
