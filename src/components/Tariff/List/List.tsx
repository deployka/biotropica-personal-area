import React from 'react';
import { Tariff } from '../../../@types/entities/Tariff';
import { TariffCard } from '../Card/Card';
import { TariffMobileCard } from '../MobileCard/MobileCard';

import s from './List.module.scss';

type Props = {
  tariffs: Tariff[] | undefined;
  isMobile: boolean;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  isError?: boolean;
  refetchTariffs: () => void;
  onSelect: (tariff: Tariff) => void;
};

export const TariffsList = ({
  tariffs,
  refetchTariffs,
  isMobile,
  isLoading,
  isSelectLoading,
  isError,
  onSelect,
}: Props) => {
  if (isLoading) return <p>Загрузка</p>;
  if (!isLoading && isError) return <p>Произошла ошибка</p>;
  if (!tariffs) return <p>Тарифы отсутствуют</p>;
  if (!isLoading && !isError && tariffs.length === 0) {
    return <p>Тарифы отсутствуют</p>;
  }

  return (
    <div className={s.tariffs}>
      {tariffs.map((tariff, i) =>
        isMobile ? (
          <TariffMobileCard
            key={`${tariff.title}_${tariff.cost}_${i}`}
            tariff={tariff}
            isSelectLoading={isSelectLoading}
            onSelect={() => {
              onSelect(tariff);
            }}
            refetchTariffs={refetchTariffs}
          />
        ) : (
          <TariffCard
            key={`${tariff.title}_${tariff.cost}_${i}`}
            tariff={tariff}
            isSelectLoading={isSelectLoading}
            onSelect={() => {
              onSelect(tariff);
            }}
            refetchTariffs={refetchTariffs}
          />
        ),
      )}
    </div>
  );
};
