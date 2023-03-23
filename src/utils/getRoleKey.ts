import { ROLE } from '../@types/entities/Role';

const roleKeys = {
  [ROLE.ADMIN]: process.env.REACT_APP_ROLE_ADMIN,
  [ROLE.TRAINER]: process.env.REACT_APP_ROLE_SPECIALIST,
  [ROLE.CLIENT]: process.env.REACT_APP_ROLE_CLIENT,
};

export function getRoleKeyByName(role: ROLE) {
  return roleKeys[role] || roleKeys[ROLE.CLIENT];
}
