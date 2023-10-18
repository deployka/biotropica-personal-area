import { ROLE } from '../@types/entities/Role';

const roleKeys: { [key in ROLE]: string | undefined } = {
  [ROLE.ADMIN]: process.env.REACT_APP_ROLE_ADMIN,
  [ROLE.SPECIALIST]: process.env.REACT_APP_ROLE_SPECIALIST,
  [ROLE.CLIENT]: process.env.REACT_APP_ROLE_CLIENT,
  [ROLE.TRAINER]: process.env.REACT_APP_ROLE_SPECIALIST,
};

export function getRoleKeyByName(role: ROLE) {
  return roleKeys[role] || roleKeys[ROLE.CLIENT];
}
