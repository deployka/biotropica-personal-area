export type Tariff = {
	id: number,
	cost: number,
  title: string,
	description: string,
	includedFields: Array<string>,
};

export type NewTariff = {
	cost: number;
	title: string;
	description: string;
	includedFields: Array<string>,
};
