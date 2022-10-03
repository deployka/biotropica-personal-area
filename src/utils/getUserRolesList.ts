import { BaseUser } from '../@types/entities/BaseUser';
import { ROLE } from '../@types/entities/Role';

export function getUserRolesList(user: BaseUser): ROLE[] {
  return user.roles.map(role => role.name);
}
