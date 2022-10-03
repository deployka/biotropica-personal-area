import classNames from 'classnames';
import React, { ReactNode } from 'react';

import s from './Empty.module.scss';

type Props = {
  className?: string;
  children: ReactNode;
};

export const Empty = ({ className, children }: Props) => {
  return <div className={classNames(s.empty, className)}>{children}</div>;
};
