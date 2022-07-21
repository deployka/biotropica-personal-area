import { BaseEntity } from './BaseEntity';

export type InvoiceStatus = 'waiting' | 'paid' | 'failed';

export type Invoice = BaseEntity & {
  status: InvoiceStatus;
  paymentForm: string;
  targetUuid: string;
};
