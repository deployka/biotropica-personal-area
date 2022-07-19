import React, { useState } from 'react';
import { ROLE } from '../../@types/entities/Role';
import { useGetWaitingUsersQuery } from '../../api/recommendations';
import { useGetAllUsersQuery } from '../../api/user';
import { UserList } from './components/UserList/UserList';

export function SpecialistUsers() {
  const [isWaitingUsersList, setIsWaitingUsersList] = useState(false);

  const { data: users = [] } = useGetAllUsersQuery({
    roles: [ROLE.CLIENT],
  });

  const { data: waitingUsers = [] } = useGetWaitingUsersQuery();

  return (
    <div>
      {users ? (
        <UserList
          users={isWaitingUsersList ? waitingUsers : users}
          setIsWaitingUsersList={setIsWaitingUsersList}
        />
      ) : (
        'У вас нет доступа'
      )}
    </div>
  );
}
