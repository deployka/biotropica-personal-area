import { baseApi } from './baseApi';
import { Role } from '../types/user';

export const usersApi = baseApi.injectEndpoints({
  endpoints(builder) {
    return {
      getAllRoles: builder.query<Role[], void>({
        query() {
          return {
            method: 'get',
            url: 'roles',
          };
        },
      }),
    };
  },
});

export const {
  useGetAllRolesQuery,
} = usersApi;

export default usersApi;
