import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { notification } from '../../../config/notification/notificationForm';
import {
  fetchGoalData,
  setGoalResponse,
} from '../../../store/ducks/goal/actionCreators';
import { Goal } from '../../../store/ducks/goal/contracts/state';
import {
  selectGoalData,
  selectGoalResponse,
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

export interface Dates {
  startDate: Date;
  endDate: Date;
}

interface Params {
  id: string;
}

const Goals = (props: Props) => {
  const history = useHistory();
  const goals: Goal[] = useSelector(selectGoalsData) || [];
  const loading = useSelector(selectGoalsStatus);
  const loadingGoal = useSelector(selectGoalStatus);
  const response = useSelector(selectGoalResponse);
  const dispatch = useDispatch();

  const { id } = useParams<Params>();
  const activeGoalId: number = parseInt(id, 10);
  const goal = useSelector(selectGoalData);

  const activeGoalTemplate = activeGoalId ? goal : goals[0];

  useEffect(() => {
    if (activeGoalId) {
      dispatch(fetchGoalData(activeGoalId));
    }
  }, [activeGoalId]);

  useEffect(() => {
    if (loadingGoal === LoadingStatus.ERROR && goals.length) {
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message || 'Произошла непредвиденная ошибка',
        type: 'danger',
      });
      dispatch(setGoalResponse(undefined));
    }
  }, [loadingGoal, goal]);

  useEffect(() => {
    if (
      (!activeGoalId && loading === LoadingStatus.SUCCESS && goals.length) ||
      (!activeGoalTemplate && loading === LoadingStatus.SUCCESS)
    ) {
      history.push(`/goals/${goals?.[0]?.id || 'add'}`);
    }
  }, [goals, loading, loadingGoal, activeGoalId]);

  useEffect(() => {
    if (loading === LoadingStatus.SUCCESS && !goals.length) {
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
        active={activeGoalId ? activeGoalId : goals[goals.length - 1]?.id}
      />
      <div className={s.goal__content}>
        <div className={s.goal__content__graph}>
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
        <div className={s.goal__content__edit}>
          <ProgressForm />
        </div>
      </div>
    </div>
  );
};
export default Goals;
