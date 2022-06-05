import React, { useEffect, useRef, useState } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../services/EventBus';
import {
  createGoalData,
  setGoalResponse,
} from '../../store/ducks/goal/actionCreators';
import {
  FormGoalData,
  GoalType,
  RunUnits,
  WeightUnits,
} from '../../store/ducks/goal/contracts/state';
import {
  selectGoalData,
  selectGoalLoadingStatus,
} from '../../store/ducks/goal/selectors';
import {
  fetchGoalsData,
  setGoalsData,
} from '../../store/ducks/goals/actionCreators';
import { selectGoalsData } from '../../store/ducks/goals/selectors';
import { LoadingStatus } from '../../store/types';
import { ISelect } from '../../shared/Form/Select/SelectCustom';
import { Selector } from '../../components/Goals/AddSelect/Selector';
import { GoalAddSelect } from '../../components/Goals/AddSelect/AddSelect';
import { GoalAddForm } from '../../components/Goals/AddForm/AddForm';

import s from './AddGoal.module.scss';

const AddGoal = () => {
  const [goalTemplate, setGoalTemplate] = useState<FormGoalData>({
    type: GoalType.WEIGHT,
    units: [{ label: '', value: null }],
    description: '',
    endResult: '',
    startResult: '',
    name: '',
  });

  const [next, setNext] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const loadingStatus = useSelector(selectGoalLoadingStatus);

  const goals: Goal[] = useSelector(selectGoalsData);
  const goal: Goal | undefined = useSelector(selectGoalData);

  const [name, setName] = useState<string>('');

  const isLoading = loadingStatus === LoadingStatus.LOADING;
  const refResetForm = useRef<(() => void) | null>(null);

  function getOptions(): ISelect<string>[] | undefined {
    switch (goalTemplate.type) {
      case GoalType.RUN:
        return [
          { value: RunUnits.KILOMETER, label: 'Километры' },
          { value: RunUnits.MINUTES, label: 'Минуты' },
          { value: RunUnits.MINUTES_KILOMETER, label: 'Км/м' },
        ];
      case GoalType.WEIGHT:
        return [
          { value: WeightUnits.GRAM, label: 'Граммы' },
          { value: WeightUnits.KILOGRAM, label: 'Килограммы' },
          { value: WeightUnits.PERCENT, label: 'Проценты' },
          { value: WeightUnits.CENTIMETERS, label: 'Сантиметры' },
        ];
      case GoalType.FORCE:
        return [{ value: WeightUnits.KILOGRAM, label: 'Килограммы' }];
      default:
        return undefined;
    }
  }

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.LOADED:
        if (!refResetForm.current) return;
        eventBus.emit(EventTypes.notification, {
          title: `Цель «${name}» успешно создана!`,
          message:
            'Не забывайте регулярно отмечать свой прогресс в достижении цели',
          type: NotificationType.SUCCESS,
          dismiss: {
            onScreen: true,
            duration: 7000,
            pauseOnHover: true,
          },
        });
        dispatch(fetchGoalsData());
        dispatch(setGoalResponse(undefined));
        refResetForm.current();
        history.push(`/goals/${goal?.id}`);
        break;
      default:
        break;
    }
  }, [loadingStatus, dispatch, goal, history, name]);

  useEffect(() => {
    if (goal && goals && loadingStatus === LoadingStatus.SUCCESS) {
      dispatch(setGoalsData([...goals, goal]));
    }
  }, [dispatch, goal, goals, loadingStatus]);

  async function onSubmit(
    values: FormGoalData,
    options: FormikHelpers<FormGoalData>,
  ) {
    refResetForm.current = options.resetForm;
    setName(values.name);
    dispatch(
      createGoalData({
        ...values,
        endResult: +values.endResult,
        startResult: +values.startResult,
      }),
    );
  }

  const selectors: Selector[] = [
    {
      type: GoalType.WEIGHT,
      title: 'Изменение веса',
      desc: 'Сбросить вес или набрать вес',
    },
    {
      type: GoalType.RUN,
      title: 'Бег',
      desc: 'Пробежать определённую дистанцию',
    },
    {
      type: GoalType.FORCE,
      title: 'Силовые показатели',
      desc: '  Поднимать определенные веса',
    },
  ];

  function onDiscard() {
    if (!goals.length) {
      history.push('/');
      return;
    }
    history.push('/goals');
  }

  return (
    <div className={s.add__goal}>
      {!next && (
        <GoalAddSelect
          goal={goalTemplate}
          onDiscard={onDiscard}
          selectors={selectors}
          setNext={setNext}
          setGoal={setGoalTemplate}
        />
      )}
      {next && (
        <GoalAddForm
          options={getOptions()}
          onSubmit={onSubmit}
          isLoading={isLoading}
          goalTemplate={goalTemplate}
          setNext={setNext}
        />
      )}
    </div>
  );
};

export default AddGoal;