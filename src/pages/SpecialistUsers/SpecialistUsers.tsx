import React, { useState } from 'react';
import { UserList } from './components/UserList/UserList';
import {
  useGetAllUsersQuery,
  useGetWaitingUsersQuery,
} from '../../store/rtk/requests/user';

export function SpecialistUsers() {
  const [isWaitingUserOpen, setIsWaitingUserOpen] = useState(false);

  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetAllUsersQuery();
  const {
    data: waitingUsers = [],
    isLoading: isWaitingUsersLoading = false,
    isError: isWaitingUsersError,
  } = useGetWaitingUsersQuery(undefined, {
    skip: !isWaitingUserOpen,
  });

  return (
    <div>
      {!isUsersError ? (
        <UserList
          usersList={isWaitingUserOpen ? waitingUsers : users}
          isLoading={isUsersLoading || isWaitingUsersLoading}
          checked={isWaitingUserOpen}
          setChecked={setIsWaitingUserOpen}
        />
      ) : (
        'У вас нет доступа'
      )}
    </div>
  );
}
