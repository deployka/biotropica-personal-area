export type CreateTariffDto = {
  cost: number;
  zakazSystemId: string;
  title: string;
  description: string;
  includedFields: string[];
};
