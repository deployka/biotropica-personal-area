import { User } from '../../../../store/ducks/user/contracts/state';

import s from './Progress.module.scss';

interface Props {
  user: User;
}

export const Progress = ({ user }: Props) => {
  return <div className={s.progress}>Progress</div>;
};
