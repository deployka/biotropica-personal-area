import { InvoiceStatus } from '../@types/entities/Invoice';
import { ProductType } from '../@types/entities/Product';

const statuses: Record<ProductType, Record<InvoiceStatus, string>> = {
  consultation: {
    failed: 'ошибка при оплате',
    paid: 'оплачена',
    waiting: 'консультация заказана, но не оплачена',
  },
  tariff: {
    failed: 'ошибка при оплате',
    paid: 'оплачен',
    waiting: 'проверка платежа',
  },
};

const colors = {
  failed: 'tomato',
  paid: 'rgb(97, 208, 127)',
  waiting: 'blue',
};

export const getInvoiceStatusByProduct = (
  status: InvoiceStatus,
  type: ProductType,
): string => {
  return statuses[type][status];
};

export const getInvoiceStatusColor = (status: InvoiceStatus): string => {
  return colors[status];
};
