import { Role } from '../@types/entities/Role';
import { baseApi } from './base-api';

export const usersApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getAllRoles: builder.query<Role[], void>({
        query() {
          return {
            method: 'GET',
            url: 'roles',
          };
        },
      }),
    };
  },
});

export const { useGetAllRolesQuery } = usersApi;

export default usersApi;
