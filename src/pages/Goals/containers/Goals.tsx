import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Goal } from '../../../store/ducks/goal/contracts/state';
import {
  selectGoalsData,
  selectGoalsStatus,
} from '../../../store/ducks/goals/selectors';
import { LoadingStatus } from '../../../store/types';
import { Graph } from '../components/Graph/Graph';
import { ProgressForm } from '../components/ProgressForm/ProgressForm';
import s from './Goals.module.scss';
import { GraphHeader } from './GraphHeader';
import { Header } from './Header';

interface Props {}

export const Goals = (props: Props) => {
  const history = useHistory();

  const goals: Goal[] = useSelector(selectGoalsData) || [];
  const loading = useSelector(selectGoalsStatus);

  const [activeGoal, setActiveGoal] = useState<Goal>(goals[goals.length - 1]);

  useEffect(() => {
    if (loading === LoadingStatus.SUCCESS && !goals.length) {
      history.push('/goals/add');
    }
  }, [loading]);

  useEffect(() => {
    setActiveGoal(() => goals[goals.length - 1]);
  }, [goals, loading]);

  const selectedPeriod = {
    from: '01.06.21',
    to: '31.06.21',
  };

  function isRender() {
    return activeGoal && goals.length;
  }

  return (
    <div className={s.goals}>
      {isRender() && (
        <Header setActive={setActiveGoal} active={activeGoal.id} />
      )}
      {isRender() && (
        <div className={s.goal__content}>
          <div className={s.goal__content__graph}>
            <GraphHeader goal={activeGoal} selectedPeriod={selectedPeriod} />
            <Graph />
          </div>
          <div className={s.goal__content__edit}>
            <ProgressForm goal={activeGoal} />
          </div>
        </div>
      )}
    </div>
  );
};
