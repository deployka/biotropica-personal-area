import { ROLE } from '../../entities/Role';

export type GetUsersDto = Readonly<{
  roles: ROLE[];
}>;
