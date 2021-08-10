import { Link } from 'react-router-dom';
import s from './Goals.module.scss';
interface Props {
  Goals: any;
}

export const Goals = ({ Goals }: Props) => {
  return (
    <Link style={{ textDecoration: 'none' }} to="/goals">
      <div className={s.goals}>
        {Goals.amount}
        <span> активных целей</span>
      </div>
    </Link>
  );
};
