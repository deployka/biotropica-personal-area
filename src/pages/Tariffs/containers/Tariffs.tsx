import React, { useState, useEffect } from 'react';

import { Tariff } from '../components/Tariff/Tariff';
import { TariffMobile } from '../components/TariffMobile/TariffMobile';

import s from './Tariffs.module.scss';

export interface Tariff {
  price: string;
  name: string;
  features: string[];
  prolongLink: string;
}

const Tariffs = () => {
  const tariffsTest: Tariff[] = [
    {
      price: '6 000',
      name: 'Базовый пакет',
      features: [
        'Определение рисков для здоровья',
        'Рекомендации тренера',
        'Рекомендации диетолога',
        'Рекомендации нутрициолога',
      ],
      prolongLink: 'bibi',
    },
    {
      price: '12 000',
      name: 'Расширенный пакет',
      features: [
        'Определение рисков для здоровья',
        'Рекомендации тренера',
        'Рекомендации диетолога',
        'Рекомендации нутрициолога',
        '3 индивидуальных консультаций специалистов в формате телемедицины',
      ],
      prolongLink: 'bibi',
    },
    {
      price: '24 000',
      name: 'Индивидуальный пакет',
      features: [
        'Определение рисков для здоровья',
        'Индивидуальные рекомендации от всех специалистов Биотропика',
        '6 индивидуальных видео-консультаций от специалистов в формате телемедицины',
      ],
      prolongLink: 'bibi',
    },
  ];

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (document.documentElement.clientWidth <= 500) {
      setMobile(true);
    }
  }, []);

  return (
    <div className={s.tariffs}>
      {tariffsTest.map((currentTariff: Tariff, i) => {
        if (mobile) {
          return (
            <TariffMobile
              key={`${currentTariff.name}_${currentTariff.price}_${i}`}
              tariff={currentTariff}
            />
          );
        }
        return (
          <Tariff
            key={`${currentTariff.name}_${currentTariff.price}_${i}`}
            tariff={currentTariff}
          />
        );
      })}
    </div>
  );
};

export default Tariffs;
