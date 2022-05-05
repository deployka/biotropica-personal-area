import React, { useState, useEffect } from 'react';

import { Tariff } from '../../../store/rtk/types/tariff';
import { Tariff as TariffComponent } from '../components/Tariff/Tariff';
import { TariffMobile } from '../components/TariffMobile/TariffMobile';
import Button from '../../../components/Button/Button';
import AddTariffModal from '../components/AddTariffModal/AddTariffModal';
import PlusIcon from '../../../assets/icons/plus.svg';
import { useRequestTariffsQuery } from '../../../store/rtk/requests/tariffs';

import s from './Tariffs.module.scss';

const Tariffs = () => {
  const { data: tariffs } = useRequestTariffsQuery();

  const [mobile, setMobile] = useState(false);
  const [isAddTariffModalVisible, setIsAddTariffModalVisible] = useState(false);

  useEffect(() => {
    if (document.documentElement.clientWidth <= 500) {
      setMobile(true);
    }
  }, []);

  return (
    <>
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
      <div className={s.tariffs}>
        {tariffs && tariffs.map((currentTariff: Tariff, i) => {
          if (mobile) {
            return (
              <TariffMobile
                key={`${currentTariff.title}_${currentTariff.cost}_${i}`}
                tariff={currentTariff}
              />
            );
          }
          return (
            <TariffComponent
              key={`${currentTariff.title}_${currentTariff.cost}_${i}`}
              tariff={currentTariff}
            />
          );
        })}
      </div>
      <AddTariffModal
        isVisible={isAddTariffModalVisible}
        onClose={() => setIsAddTariffModalVisible(false)}
      />
    </>
  );
};

export default Tariffs;
