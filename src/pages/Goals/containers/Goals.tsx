import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  fetchGoalData,
  setGoalResponse,
} from '../../../store/ducks/goal/actionCreators';
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

export interface Dates {
  startDate: Date;
  endDate: Date;
}

interface Params {
  id: string;
}

const Goals = () => {
  const history = useHistory();
  const goals: Goal[] = useSelector(selectGoalsData) || [];

  const goal = useSelector(selectGoalData);
  const loading = useSelector(selectGoalsStatus);
  const loadingGoal = useSelector(selectGoalStatus);
  const dispatch = useDispatch();

  const { id } = useParams<Params>();
  const activeGoalId: number = parseInt(id, 10);

  const activeGoalTemplate = activeGoalId ? goal : goals[0];

  useEffect(() => {
    if (activeGoalId && activeGoalId !== goal?.id) {
      dispatch(fetchGoalData(activeGoalId));
    }
  }, [activeGoalId, goal?.id]);

  useEffect(() => {
    if (loadingGoal === LoadingStatus.ERROR && goals.length) {
      dispatch(setGoalResponse(undefined));
    }
  }, [loadingGoal, goal]);

  useEffect(() => {
    if (
      (!activeGoalId && loading === LoadingStatus.LOADED && goals.length) ||
      (!activeGoalTemplate && loading === LoadingStatus.LOADED)
    ) {
      history.push(`/goals/${goals?.[0]?.id || 'add'}`);
    }
  }, [goals, loading, loadingGoal, activeGoalId]);

  useEffect(() => {
    if (loading === LoadingStatus.LOADED && !goals.length) {
      history.push('/goals/add');
    }
  }, [loading, goals]);

  const [dates, setDates] = useState<Dates>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [graphDates, setGraphDates] = useState<Dates>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <div className={s.goals}>
      <Header
        goals={goals.sort((a, b) => b.id - a.id)}
        active={activeGoalId ? activeGoalId : goals[goals.length - 1]?.id}
      />
      <div className={s.content}>
        <div className={s.graph}>
          <GraphHeader
            setDates={setDates}
            setGraphDates={setGraphDates}
            dates={dates}
          />
          <Graph
            startDate={graphDates.startDate}
            endDate={graphDates.endDate}
          />
        </div>
        <div className={s.edit}>
          <ProgressForm />
        </div>
      </div>
    </div>
  );
};
export default Goals;
