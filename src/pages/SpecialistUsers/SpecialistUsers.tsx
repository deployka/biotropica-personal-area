import React, { useState } from 'react';
import { ROLE } from '../../@types/entities/Role';
import { useGetWaitingUsersQuery } from '../../api/recommendations';
import { useGetAllUsersQuery } from '../../api/user';
import { UserList } from './components/UserList/UserList';

export function SpecialistUsers() {
  const [checked, setChecked] = useState(false);

  const { data: users = [] } = useGetAllUsersQuery({
    roles: [ROLE.CLIENT],
  });

  const { data: waitingUsers = [] } = useGetWaitingUsersQuery();

  return (
    <div>
      {users ? (
        <UserList
          checked={checked}
          onChecked={setChecked}
          users={checked ? waitingUsers : users}
        />
      ) : (
        'У вас нет доступа'
      )}
    </div>
  );
}
