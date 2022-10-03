import { ROLE } from '../../entities/Role';

export type CreateUserDto = Readonly<{
  email: string;
  name: string;
  lastname: string;
  phone: string;
  roles: ROLE[];
}>;
