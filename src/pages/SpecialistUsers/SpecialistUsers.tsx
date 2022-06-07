import React from 'react';
import { useGetAllUsersQuery } from '../../api/user';
import { UserList } from './components/UserList/UserList';

export function SpecialistUsers() {
  const { data: users } = useGetAllUsersQuery();

  return <div>{users ? <UserList users={users} /> : 'У вас нет доступа'}</div>;
}
