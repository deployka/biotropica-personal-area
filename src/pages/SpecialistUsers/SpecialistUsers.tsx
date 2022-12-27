import React, { useEffect, useState } from 'react';
import { ROLE } from '../../@types/entities/Role';
import { useGetWaitingUsersQuery } from '../../api/recommendations';
import { useGetAllUsersQuery } from '../../api/user';
import { UserList } from './components/UserList/UserList';
import { analyzePassedStatus } from './components/UserList/usersHelper';

export type Filters = {
  waitingForRecommendation: ('all' | 'yes')[];
  analyzes: ('loaded' | 'notLoaded' | 'all')[];
  questionnaire: ('all' | 'notFinished' | 'finished')[];
  ward: string[];
};

export function SpecialistUsers() {
  const [filters, setFilters] = useState<Filters>({
    waitingForRecommendation: ['all'],
    analyzes: ['all'],
    questionnaire: ['all'],
    ward: ['all'],
  });

  const [isWaitingUsersList, setIsWaitingUsersList] = useState(false);

  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({
    roles: [ROLE.CLIENT],
    isAnalyzesPassed: analyzePassedStatus[filters.analyzes[0]],
  });

  const { data: waitingUsers = [] } = useGetWaitingUsersQuery();

  useEffect(() => {
    const isWaitingUsersList = filters.waitingForRecommendation[0] === 'yes';
    setIsWaitingUsersList(isWaitingUsersList);
  }, [filters.waitingForRecommendation]);

  return (
    <div>
      {users ? (
        <UserList
          isLoading={isLoading || isFetching}
          filters={filters}
          users={isWaitingUsersList ? waitingUsers : users}
          setFilters={setFilters}
        />
      ) : (
        'У вас нет доступа'
      )}
    </div>
  );
}
