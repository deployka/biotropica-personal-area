export interface Tariff {
    id: number;
    title: string;
    description: string;
    includedFields: string[];
    access: TariffAccess[];
    cost: number;
}

export interface TariffAccess {
    key: string;
    value: number;
}
