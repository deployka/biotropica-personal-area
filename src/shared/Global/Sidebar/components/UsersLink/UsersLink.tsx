import React, { ReactNode } from 'react';
import styles from './UsersLinkStyles.module.scss';

type UsersCounterType = {
  children: ReactNode;
  count?: number;
};

export const UsersLink = ({ children, count }: UsersCounterType) => {
  return (
    <div className={styles.container}>
      {count && <div className={styles.counter}>{count}</div>}
      {children}
    </div>
  );
};
