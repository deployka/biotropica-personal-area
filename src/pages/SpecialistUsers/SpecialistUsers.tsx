import React from 'react';
import { UserList } from './components/UserList/UserList';
import { useGetAllUsersQuery } from '../../store/rtk/requests/user';

export function SpecialistUsers() {
  const { data: users } = useGetAllUsersQuery();

  return <div>{users ? <UserList users={users} /> : 'У вас нет доступа'}</div>;
}
