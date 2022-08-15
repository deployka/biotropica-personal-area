import React, { useEffect, useState } from 'react';
import { Tariff, TariffOrder } from '../../../@types/entities/Tariff';
import { TariffCard } from '../Card/Card';
import { TariffMobileCard } from '../MobileCard/MobileCard';

import s from './List.module.scss';

type Props = {
  tariffs: Tariff[] | undefined;
  isMobile: boolean;
  isLoading?: boolean;
  isSelectLoading?: boolean;
  tariffOrderList: TariffOrder[];
  isEditableOrder: boolean;
  isError?: boolean;
  refetchTariffs: () => void;
  onEdit: (tariff: Tariff) => void;
  onSelect: (tariff: Tariff) => void;
  setTariffOrderList: (data: TariffOrder[]) => void;
};

export const TariffsList = ({
  tariffs,
  isMobile,
  isLoading,
  isSelectLoading,
  isEditableOrder,
  isError,
  tariffOrderList,
  onEdit,
  onSelect,
  refetchTariffs,
  setTariffOrderList,
}: Props) => {
  const [sortedTariffs, setSortedTariffs] = useState<Tariff[]>([]);

  useEffect(() => {
    if (!tariffs) return;
    console.log(tariffs);

    console.log(tariffOrderList);

    const newSortedTariffsList = tariffs
      .map(tariff => {
        const order = tariffOrderList.find(
          tariffOrder => tariffOrder.tariffId === tariff.id,
        )?.order;

        return {
          ...tariff,
          order: order || 1,
        };
      })
      .sort((a, b) => a.order - b.order);

    setSortedTariffs(newSortedTariffsList);
  }, [tariffs, tariffOrderList]);

  if (isLoading) return <p>Загрузка</p>;
  if (!isLoading && isError) return <p>Произошла ошибка</p>;
  if (!tariffs) return <p>Тарифы отсутствуют</p>;
  if (!isLoading && !isError && tariffs.length === 0) {
    return <p>Тарифы отсутствуют</p>;
  }

  const handleChangeOrder = (tariffId: number, step: number) => {
    const currentOrder = tariffOrderList.find(
      tariffOrder => tariffOrder.tariffId === tariffId,
    )?.order;

    if (!currentOrder) return;

    const newOrder = currentOrder + step;

    const newOrderData = [...tariffOrderList];

    const currentOrderIndex = newOrderData.findIndex(
      it => it.order === currentOrder,
    );
    const newOrderIndex = newOrderData.findIndex(it => it.order === newOrder);

    if (currentOrderIndex === -1 || newOrderIndex === -1) return;

    newOrderData[currentOrderIndex].order = newOrder;
    newOrderData[newOrderIndex].order = currentOrder;
    setTariffOrderList(newOrderData);
  };

  return (
    <div className={s.tariffs}>
      {sortedTariffs.map(tariff =>
        isMobile ? (
          <TariffMobileCard
            key={tariff.id}
            tariff={tariff}
            isSelectLoading={isSelectLoading}
            onSelect={() => {
              onSelect(tariff);
            }}
            refetchTariffs={refetchTariffs}
          />
        ) : (
          <TariffCard
            key={tariff.id}
            order={tariff.order}
            onChangeOrder={step => handleChangeOrder(tariff.id, step)}
            onEdit={() => {
              onEdit(tariff);
            }}
            isEditableOrder={isEditableOrder}
            tariff={tariff}
            isSelectLoading={isSelectLoading}
            onSelect={() => {
              onSelect(tariff);
            }}
          />
        ),
      )}
    </div>
  );
};
