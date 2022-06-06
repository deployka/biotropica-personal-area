import { useState } from 'react';
import { Order } from '../../../../../@types/constants/Order';

export const useSort = (defaultOrder: Order) => {
  const [sort, setSort] = useState<Order>(defaultOrder);
  return { sort, setSort };
};
