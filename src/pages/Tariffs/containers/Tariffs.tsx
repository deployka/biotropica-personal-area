import React from 'react';

import { Tariff } from '../Tariff/Tariff';
import s from './Tariffs.module.scss';
interface Props {}
export interface Tariff {
  price: string;
  name: string;
  features: any[];
  prolongLink: string;
}

export const Tariffs = () => {
  const tariffsTest: Tariff[] = [
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
      {tariffsTest.map((currentTariff: Tariff, i) => (
        <Tariff
          key={`${currentTariff.name}_${currentTariff.price}_${i}`}
          tariff={currentTariff}
        />
      ))}
    </div>
  );
};
