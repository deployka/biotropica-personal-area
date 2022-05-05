import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import PlusIcon from '../../../assets/icons/plus.svg';
import Button from '../../../components/Button/Button';
import { Tariff } from '../../../store/rtk/types/tariff';
import { selectUserRoles } from '../../../store/rtk/slices/authSlice';
import { TariffMobile } from '../components/TariffMobile/TariffMobile';
import { Tariff as TariffComponent } from '../components/Tariff/Tariff';
import AddTariffModal from '../components/AddTariffModal/AddTariffModal';
import { useRequestTariffsQuery } from '../../../store/rtk/requests/tariffs';

import s from './Tariffs.module.scss';

const Tariffs = () => {
  const { data: tariffs, refetch: refetchTariffs } = useRequestTariffsQuery();

  const [mobile, setMobile] = useState(false);

  const [isAddTariffModalVisible, setIsAddTariffModalVisible] = useState(false);

  const roles = useSelector(selectUserRoles);

  const isAdmin = roles.includes('ADMIN');

  useEffect(() => {
    if (document.documentElement.clientWidth <= 500) {
      setMobile(true);
    }
  }, []);

  return (
    <>
      {
        isAdmin && (
          <div className={s.header}>
            <Button
              isPrimary
              className={s.addBtn}
              onClick={() => setIsAddTariffModalVisible(true)}
            >
              <img className={s.plusForAddBtn} src={PlusIcon} alt="" />
              <span>Добавить новый тариф</span>
            </Button>
          </div>
        )
      }
      <div className={s.tariffs}>
        {tariffs && tariffs.map((currentTariff: Tariff, i) => {
          if (mobile) {
            return (
              <TariffMobile
                key={`${currentTariff.title}_${currentTariff.cost}_${i}`}
                tariff={currentTariff}
                refetchTariffs={refetchTariffs}
              />
            );
          }
          return (
            <TariffComponent
              key={`${currentTariff.title}_${currentTariff.cost}_${i}`}
              tariff={currentTariff}
              refetchTariffs={refetchTariffs}
            />
          );
        })}
      </div>
      <AddTariffModal
        isVisible={isAddTariffModalVisible}
        refetchTariffs={refetchTariffs}
        onClose={() => setIsAddTariffModalVisible(false)}
      />
    </>
  );
};

export default Tariffs;
