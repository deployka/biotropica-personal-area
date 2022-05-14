import React, { useState, useEffect } from 'react';

import { Tariff } from '../components/Tariff/Tariff';
import { TariffMobile } from '../components/TariffMobile/TariffMobile';

import './paymentForm.scss';
import s from './Tariffs.module.scss';
import { useGetAllTariffsQuery, useSelectTariffMutation } from '../../../store/rtk/requests/tariffs';
import { Tariff as ITariff } from '../../../store/rtk/types/tariff';
import Modal from '../../../shared/Global/Modal/Modal';

const Tariffs = () => {
  const { data: tariffs } = useGetAllTariffsQuery();
  const [selectTariff] = useSelectTariffMutation();
  const [paymentForm, setPaymentForm] = useState('');

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (document.documentElement.clientWidth <= 500) {
      setMobile(true);
    }
  }, []);

  async function handleSelectTariff(tariff: ITariff) {
    const result = await selectTariff(tariff.id) as { data: { tinkoffForm: string } };
    setPaymentForm(result.data && result.data.tinkoffForm);
  }

  if (!tariffs) {
    return null;
  }

  return (
    <div className={s.tariffs}>
      {tariffs.map((currentTariff: ITariff, i) => {
        if (mobile) {
          return (
            <TariffMobile
              key={`${currentTariff.title}_${currentTariff.cost}_${i}`}
              tariff={currentTariff}
              onSelect={() => {
                handleSelectTariff(currentTariff);
              }}
            />
          );
        }
        return (
          <Tariff
            key={`${currentTariff.title}_${currentTariff.cost}_${i}`}
            tariff={currentTariff}
            onSelect={() => {
              handleSelectTariff(currentTariff);
            }}
          />
        );
      })}
      <Modal isOpened={!!paymentForm} close={() => {
        //
      }}>
        <div>
          <p style={{ marginBottom: '15px' }}>
            Выберете способ оплаты:
          </p>
          <div dangerouslySetInnerHTML={{ __html: paymentForm }}/>
        </div>
      </Modal>
    </div>
  );
};

export default Tariffs;
