export type Tariff = {
    id: number;
    cost: number;
    title: string;
    description: string;
	includedFields: Array<string>,
}

export type NewTariff = Omit<Tariff, 'id'>
