import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchGoalData } from '../../../store/ducks/goal/actionCreators';
import { Goal } from '../../../store/ducks/goal/contracts/state';
import {
  selectGoalData,
  selectGoalStatus,
} from '../../../store/ducks/goal/selectors';
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
  const location = useLocation();
  const goals: Goal[] = useSelector(selectGoalsData) || [];
  const loading = useSelector(selectGoalsStatus);
  const loadingGoal = useSelector(selectGoalStatus);
  const dispatch = useDispatch();

  const activeGoalId: number = parseInt(location.pathname.split('/')[2]);
  const goal = useSelector(selectGoalData);

  const activeGoalTemplate = activeGoalId ? goal : goals[goals.length - 1];

  useEffect(() => {
    if (activeGoalId) {
      dispatch(fetchGoalData(activeGoalId));
    }
  }, [activeGoalId]);

  useEffect(() => {
    if (
      (!activeGoalId && loading === LoadingStatus.SUCCESS && goals.length) ||
      (!activeGoalTemplate && loading === LoadingStatus.SUCCESS)
    ) {
      history.push(`/goals/${goals[goals.length - 1]?.id}`);
    }
  }, [goals, loading, loadingGoal, activeGoalId]);

  useEffect(() => {
    if (loading === LoadingStatus.SUCCESS && !goals.length) {
      history.push('/goals/add');
    }
  }, [loading, goals]);

  const selectedPeriod = {
    from: '01.06.21',
    to: '31.06.21',
  };

  return (
    <div className={s.goals}>
      <Header
        active={activeGoalId ? activeGoalId : goals[goals.length - 1]?.id}
      />
      <div className={s.goal__content}>
        <div className={s.goal__content__graph}>
          <GraphHeader selectedPeriod={selectedPeriod} />
          <Graph />
        </div>
        <div className={s.goal__content__edit}>
          <ProgressForm />
        </div>
      </div>
    </div>
  );
};
