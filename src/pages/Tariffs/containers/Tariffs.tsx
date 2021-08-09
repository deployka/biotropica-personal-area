import React from 'react';

import { Tariff } from '../Tariff/Tariff';
import s from './Tariffs.module.scss';
interface Props {}
export interface Feature {
  feature: string;
}

export const Tariffs = (props: Props, { feature }: Feature) => {
  const tariffsTest = [
    {
      price: '15 999',
      name: 'Базовый пакет',
      features: [
        'Интерпретация результатов анализов',
        'Рекомендации тренера',
        'Рекомендации диетолога',
        'Рекомендации нутрициолога',
      ],
      prolongLink: 'bibi',
    },
    {
      price: '25 999',
      name: 'Расширенный пакет',
      features: [
        'Интерпретация результатов анализов',
        'Рекомендации тренера',
        'Рекомендации диетолога',
        'Рекомендации нутрициолога',
        'Рекомендации психолога',
        'Рекомендации эндокринолога',
      ],
      prolongLink: 'bibi',
    },
    {
      price: '35 999',
      name: 'Индивидуальный пакет',
      features: [
        'Интерпретация результатов анализов',
        'Консультации тренера по видеосвязи',
        'Консультации диетолога по видеосвязи',
        'Консультации нутрициолога по видеосвязи',
        'Консультации психолога по видеосвязи',
        'Консультации эндокринолога по видеосвязи',
      ],
      prolongLink: 'bibi',
    },
  ];
  return (
    <div className={s.tariffs}>
      {tariffsTest.map((currentTariff) => (
        <Tariff tariff={currentTariff} />
      ))}
    </div>
  );
};
