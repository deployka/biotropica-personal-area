import { ISelect } from '../../../shared/Form/Select/SelectCustom';

export type UpdateUserDto = Readonly<
  { id: UniqueId } & Partial<{
    profilePhoto: File | null | string;
    dob: DateTimeString;
    gender: ISelect<string>[];
    isOnline: boolean;
    banned: boolean;
    banReason: string;
    email: Email;
    password: string;
    name: string;
    lastname: string;
    patronymic: string;
    phone: string;
  }>
>;
