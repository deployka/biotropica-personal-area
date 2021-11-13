import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
  isAuth: boolean;
  path: string;
  exact?: boolean;
}
