import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Goal } from '../../../../store/ducks/goal/contracts/state';
import { selectGoalsData } from '../../../../store/ducks/goals/selectors';
import s from './Goals.module.scss';
interface Props {}

export const Goals = ({}: Props) => {
  const goals: Goal[] = useSelector(selectGoalsData) || [];
  return (
    <Link style={{ textDecoration: 'none' }} to="/goals">
      <div className={s.goals}>
        {goals.length}
        <span> активных целей</span>
      </div>
    </Link>
  );
};
