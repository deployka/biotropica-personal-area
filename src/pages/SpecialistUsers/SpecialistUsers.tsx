import React, { useEffect, useState } from 'react';
import { ROLE } from '../../@types/entities/Role';
import { useGetAllUsersQuery } from '../../api/user';
import { UserList } from './components/UserList/UserList';
import { analyzePassedStatus } from './components/UserList/usersHelper';

export type Filters = {
  analyzes: ('loaded' | 'notLoaded' | 'all')[];
  questionnaire: ('all' | 'notFinished' | 'finished')[];
  ward: string[];
};

export function SpecialistUsers() {
  const [filters, setFilters] = useState<Filters>({
    analyzes: ['all'],
    questionnaire: ['all'],
    ward: ['all'],
  });
  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({
    roles: [ROLE.CLIENT],
    isAnalyzesPassed: analyzePassedStatus[filters.analyzes[0]],
  });

  return (
    <div>
      {users ? (
        <UserList
          isLoading={isLoading || isFetching}
          filters={filters}
          users={users}
          setFilters={setFilters}
        />
      ) : (
        'У вас нет доступа'
      )}
    </div>
  );
}
