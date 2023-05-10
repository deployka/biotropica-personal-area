import React, { useEffect, useState } from 'react';
import { ROLE } from '../../@types/entities/Role';
import { useGetAllUsersQuery } from '../../api/user';
import { SpecialistList } from './components/SpecialistList/SpecialistList';
import { analyzePassedStatus } from './components/SpecialistList/specialistHelper';

export type Filters = {
  analyzes: ('loaded' | 'notLoaded' | 'all')[];
  questionnaire: ('all' | 'notFinished' | 'finished')[];
  ward: string[];
};

export function UsersSpecialist() {
  const [filters, setFilters] = useState<Filters>({
    analyzes: ['all'],
    questionnaire: ['all'],
    ward: ['all'],
  });
  const {
    data: specialists = [],
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({
    roles: [ROLE.TRAINER],
    isAnalyzesPassed: analyzePassedStatus[filters.analyzes[0]],
  });

  return (
    <div>
      {specialists ? (
        <SpecialistList
          isLoading={isLoading || isFetching}
          filters={filters}
          specialists={specialists}
          setFilters={setFilters}
        />
      ) : (
        'У вас нет доступа'
      )}
    </div>
  );
}
