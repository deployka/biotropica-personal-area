import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Goal } from './Goal';
import {
  getProgressValueByTypeAndUnit,
  showNotificationAfterDeleteGoal,
  showNotificationAfterGoalComplete,
  showNotificationAfterUpdateGoal,
} from '../../utils/goalsHelper';
import { MAX_PROGRESS } from '../../constants/goals';

import s from './Goals.module.scss';
import { Header } from '../../components/Goals/Header/Header';
import {
  useDeleteGoalMutation,
  useGetGoalQuery,
  useGetGoalsQuery,
  useUpdateGoalMutation,
} from '../../api/goals';
import { UpdateGoalValuesDto } from '../../@types/dto/goals/update-values.dto';
import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { createCookie, readCookie } from '../../utils/cookie';
export interface Dates {
  startDate: Date;
  endDate: Date;
}

const Goals = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const paramGoalId = +id;
  const SEVEN_DAY = 604800;

  const { data: goals = [], isFetching: isLoadingGoals } = useGetGoalsQuery();
  const {
    data: goal,
    isFetching: isLoadingGoal,
    isError,
  } = useGetGoalQuery({
    id: paramGoalId || goals[0]?.id,
  });
  const [updateGoal] = useUpdateGoalMutation();
  const [deleteGoal] = useDeleteGoalMutation();

  function goToCurrentGoal() {
    if (goals.length) {
      history.push(`/goals/${goals[0].id}`);
    } else {
      history.push('/goals/add');
    }
  }

  useEffect(() => {
    if (goal?.id) {
      history.push(`/goals/${goal.id}`);
    }
  }, [goal?.id]);

  useEffect(() => {
    if (isLoadingGoals || !isError) return;
    goToCurrentGoal();
  }, [isError, isLoadingGoals]);

  async function onDeleteGoal(id: UniqueId, name: string) {
    try {
      await deleteGoal({ id }).unwrap();
      showNotificationAfterDeleteGoal(name);
      goToCurrentGoal();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: (error as { message: string })?.message,
        type: NotificationType.DANGER,
      });
    }
  }

  async function onCompleteGoal(id: UniqueId, name: string) {
    try {
      await updateGoal({ id, completed: true }).unwrap();
      showNotificationAfterGoalComplete(name);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: (error as { message: string })?.message,
        type: NotificationType.DANGER,
      });
    }
  }

  useEffect(() => {

    const shopDateView = Number(readCookie('shop_date_view'));

    if (shopDateView + SEVEN_DAY > Date.now()) {
      return;
    }

    if (!shopDateView) {
      createCookie('shop_date_view', Date.now().toString(), 365);
    }

    // eventBus.emit(EventTypes.notification, {
    //   message: (
    //     <div>
    //       {'Вы можете приобрести товары для спорта и здорового 
    //       образа жизни в нашем интернет-магазине по приятным ценам '}
    //       <button
    //         style={{ marginLeft: '10px' }}
    //         onClick={() => (document.location = 'https://biotropika.ru/shop/')}
    //       >
    //         Перейти
    //       </button>
    //     </div>
    //   ),
    //   type: NotificationType.INFO,
    // });
  }, []);

  async function onUpdateGoal(
    { value, createdAt }: UpdateGoalValuesDto,
    id: UniqueId,
    name: string,
  ) {
    const data = {
      id,
      values: [
        {
          value: +value,
          createdAt,
        },
      ],
    };

    try {
      const updatedGoal = await updateGoal(data).unwrap();

      const progressValue = getProgressValueByTypeAndUnit(
        updatedGoal.type,
        updatedGoal.units,
        updatedGoal,
      );

      if (progressValue >= MAX_PROGRESS) {
        const isConfirm = confirm(
          'Завершить цель? Она пропадет из списка активных целей',
        );
        isConfirm && (await onCompleteGoal(updatedGoal.id, updatedGoal.name));
        goToCurrentGoal();
      } else {
        showNotificationAfterUpdateGoal(name);
      }
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: (error as { message: string })?.message,
        type: NotificationType.DANGER,
      });
    }
  }

  async function onGoalClick(id: number) {
    history.push(`/goals/${id}`);
  }

  console.log('goals', goals);

  if (isLoadingGoals) {
    return <>загрузка...</>;
  }

  if (!isLoadingGoal && goals.length === 0) {
    history.push('/goals/add');
  }

  return (
    <div className={s.goals}>
      <Header
        onGoalClick={onGoalClick}
        goals={goals}
        active={paramGoalId || goals[goals.length - 1]?.id}
      />
      <Goal
        progressBarOptions={{
          width: 120,
          height: 120,
          circleWidth: 8,
          gradientStartColor: '#6F61D0',
          gradientStopColor: '#C77EDF',
          bgColor: '#F7F6FB',
        }}
        goal={goal}
        isLoading={isLoadingGoal}
        onDelete={onDeleteGoal}
        onUpdate={onUpdateGoal}
      />
    </div>
  );
};
export default Goals;
