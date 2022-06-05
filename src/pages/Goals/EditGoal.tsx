import { FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import EditGoalForm from '../../components/Goals/EditForm/GoalEditForm';
import { eventBus, EventTypes } from '../../services/EventBus';
import {
  fetchGoalData,
  setGoalData,
  setGoalResponse,
  updateGoalData,
} from '../../store/ducks/goal/actionCreators';
import { UpdateGoalData } from '../../store/ducks/goal/contracts/state';
import {
  selectGoalData,
  selectGoalLoadingStatus,
} from '../../store/ducks/goal/selectors';
import { setGoalsData } from '../../store/ducks/goals/actionCreators';
import { selectGoalsData } from '../../store/ducks/goals/selectors';
import { LoadingStatus } from '../../store/types';

const EditGoal = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectGoalLoadingStatus);
  const history = useHistory();
  const location = useLocation();

  const goal: Goal | undefined = useSelector(selectGoalData);
  const goals: Goal[] | undefined = useSelector(selectGoalsData);

  const [name, setName] = useState<string>('');

  const [loader, setLoader] = useState<boolean>(false);
  const refResetForm = useRef<(() => void) | null>(null);

  useEffect(() => {
    dispatch(setGoalData(undefined));
    const id = location.pathname.split('/')[3];
    dispatch(fetchGoalData(parseInt(id)));
  }, [location.pathname]);

  useEffect(() => {
    if (!goal && loadingStatus === LoadingStatus.ERROR) {
      history.push('/goals');
    }
  }, [goal, loadingStatus]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }

    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.LOADED && refResetForm.current) {
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${name}» успешно обновлена!`,
        message:
          'Не забывайте регулярно отмечать свой прогресс в достижении цели',
        type: NotificationType.INFO,
        dismiss: {
          onScreen: true,
          duration: 5000,
          pauseOnHover: true,
        },
      });
      dispatch(setGoalResponse(undefined));
      if (goal && goals) {
        dispatch(
          setGoalsData([...goals.filter(fGoal => fGoal.id !== goal.id), goal]),
        );
      }
      refResetForm.current();
      if (goal) {
        history.push(`/goals/${goal.id}`);
      }
    }
  }, [loadingStatus, goal]);

  async function onSubmit(
    values: UpdateGoalData,
    options: FormikHelpers<UpdateGoalData>,
  ) {
    refResetForm.current = options.resetForm;
    setName(values?.name || '');
    dispatch(updateGoalData(values));
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }
  return (
    <EditGoalForm
      goal={goal}
      loader={loader}
      isDisabled={isDisabled}
      onSubmit={onSubmit}
    />
  );
};
export default EditGoal;
