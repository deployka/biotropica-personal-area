import { BaseUser } from '../../@types/entities/BaseUser';

export function filterUserByQuery(user: BaseUser, q: string) {
  const query = q.toLowerCase().trim();
  const { name, lastname } = user;
  return [name, lastname].some(field => field?.toLowerCase().includes(query));
}
