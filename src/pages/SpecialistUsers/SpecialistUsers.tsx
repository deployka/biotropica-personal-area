import React, { useMemo, useState } from 'react';
import { UserList } from './components/UserList/UserList';
import { useSubscribersByUserIdCorrectedQuery } from '../../api/subscribers';
import { SubscribeStatus } from '../../@types/dto/subscribers/update-subscriber.dto';
import { useGetCurrentSpecialistQuery } from '../../api/specialists';

export type Filters = {
  analyzes: ('loaded' | 'notLoaded' | 'all')[];
  questionnaire: ('all' | 'notFinished' | 'finished')[];
  ward: string[];
};

export function SpecialistsUsers() {
  const [filters, setFilters] = useState<Filters>({
    analyzes: ['all'],
    questionnaire: ['all'],
    ward: ['all'],
  });

  // const {
  //   data: users = [],
  //   isLoading,
  //   isFetching,
  // } = useGetAllUsersQuery({
  //   roles: [ROLE.CLIENT],
  //   isAnalyzesPassed: analyzePassedStatus[filters.analyzes[0]],
  // });

  const { data: currentSpecialist } = useGetCurrentSpecialistQuery();

  const { data: subs = [], isFetching } = useSubscribersByUserIdCorrectedQuery(
    currentSpecialist?.id || 0,
    {
      skip: !currentSpecialist?.id,
    },
  );

  const preparedUsers = useMemo(() => {
    return subs
      ?.filter(el => el.status !== SubscribeStatus.REJECTED)
      .map(el => el.user);
  }, [subs]);

  return (
    <div>
      {preparedUsers ? (
        <UserList
          isLoading={isFetching}
          filters={filters}
          users={preparedUsers}
          setFilters={setFilters}
        />
      ) : (
        'У вас нет доступа'
      )}
    </div>
  );
}
