import React, { ReactNode, useMemo } from 'react';
import styles from './UsersLinkStyles.module.scss';
import { useGetAllUsersQuery } from '../../../../../api/user';
import { analyzePassedStatus } from '../../../../../components/AdminUsers/adminUsersHelper';

type UsersCounterType = {
  children: ReactNode;
};

export const UsersLink = ({ children }: UsersCounterType) => {
  const { data: users = [] } = useGetAllUsersQuery({
    isAnalyzesPassed: analyzePassedStatus.all,
  });
  const count = useMemo(
    () => users.filter(el => !el.isEnabled).length,
    [users],
  );
  return (
    <div className={styles.container}>
      {count && <div className={styles.counter}>{count}</div>}
      {children}
    </div>
  );
};
