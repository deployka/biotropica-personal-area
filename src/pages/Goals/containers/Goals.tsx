import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DateContext } from '../../../context/DatesContext';
import { Dates } from '../../../shared/Global/Calendar/Calendar';
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

  const activeGoalTemplate = activeGoalId ? goal : goals[0];

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
      history.push(`/goals/${goals[0]?.id}`);
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

  return (
    <DateContext.Provider
      value={{
        dates,
        setDates,
      }}
    >
      <div className={s.goals}>
        <Header
          active={activeGoalId ? activeGoalId : goals[goals.length - 1]?.id}
        />
        <div className={s.goal__content}>
          <div className={s.goal__content__graph}>
            <GraphHeader />
            <Graph dates={dates} />
          </div>
          <div className={s.goal__content__edit}>
            <ProgressForm />
          </div>
        </div>
      </div>
    </DateContext.Provider>
  );
};
