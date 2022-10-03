import { Invoice, InvoiceStatus } from '../@types/entities/Invoice';
import { baseApi } from './base-api';

export const invoiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getStatusByProductUuid: builder.query<{ status: InvoiceStatus }, Uuid>({
      query: (id: Uuid) => ({
        url: `payments/invoices/get-status/${id}`,
        method: 'GET',
      }),
      providesTags: ['InvoiceStatus'],
    }),
    getInvoiceByProductUuid: builder.query<Invoice, Uuid>({
      query: (id: Uuid) => ({
        url: `payments/invoices/target/${id}`,
        method: 'GET',
      }),
      providesTags: ['Invoice'],
    }),
  }),
});

export const {
  useGetStatusByProductUuidQuery,
  useGetInvoiceByProductUuidQuery,
} = invoiceApi;

export default invoiceApi;
