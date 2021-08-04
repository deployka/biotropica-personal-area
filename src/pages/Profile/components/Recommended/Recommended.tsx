import { User } from '../../../../store/ducks/user/contracts/state';

import s from './Recommended.module.scss';

interface Props {
  user: User;
}

export const Recommended = ({ user }: Props) => {
  return <div className={s.recommended}>Recommended</div>;
};
