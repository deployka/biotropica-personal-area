import { User } from '../../../../store/ducks/user/contracts/state';

import s from './TestsAndAnalyze.module.scss';

interface Props {
  user: User;
}

export const TestsAndAnalyze = ({ user }: Props) => {
  return <div className={s.tests__and__analyze}>TestsAndAnalyze</div>;
};
