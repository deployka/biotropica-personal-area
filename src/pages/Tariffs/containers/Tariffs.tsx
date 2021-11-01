import React, { useState, useEffect } from "react";

import { Tariff } from "../components/Tariff/Tariff";
import { TariffMobile } from "../components/TariffMobile/TariffMobile";

import s from "./Tariffs.module.scss";

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
      price: "15 999",
      name: "Базовый пакет",
      features: [
        "Интерпретация результатов анализов",
        "Рекомендации тренера",
        "Рекомендации диетолога",
        "Рекомендации нутрициолога",
      ],
      prolongLink: "bibi",
    },
    {
      price: "25 999",
      name: "Расширенный пакет",
      features: [
        "Интерпретация результатов анализов",
        "Рекомендации тренера",
        "Рекомендации диетолога",
        "Рекомендации нутрициолога",
        "Рекомендации психолога",
        "Рекомендации эндокринолога",
      ],
      prolongLink: "bibi",
    },
    {
      price: "35 999",
      name: "Индивидуальный пакет",
      features: [
        "Интерпретация результатов анализов",
        "Консультации тренера по видеосвязи",
        "Консультации диетолога по видеосвязи",
        "Консультации нутрициолога по видеосвязи",
        "Консультации психолога по видеосвязи",
        "Консультации эндокринолога по видеосвязи",
      ],
      prolongLink: "bibi",
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
