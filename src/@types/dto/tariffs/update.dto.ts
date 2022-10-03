export type UpdateTariffDto = {
  id: number;
  cost: number;
  zakazSystemId: string;
  title: string;
  description: string;
  includedFields: string[];
};
