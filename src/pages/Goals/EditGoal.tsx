import React from 'react';
import { FormikHelpers } from 'formik';
import { useHistory, useLocation } from 'react-router';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import EditGoalForm from '../../components/Goals/EditForm/GoalEditForm';
import { eventBus, EventTypes } from '../../services/EventBus';
import { UpdateGoalDto } from '../../@types/dto/goals/update.dto';
import { useGetGoalQuery, useUpdateGoalMutation } from '../../api/goals';
import { ResponseError } from '../../@types/api/response';

const EditGoal = () => {
  const history = useHistory();
  const location = useLocation();

  const id = location.pathname.split('/')[3];

  const { data: goal } = useGetGoalQuery({ id: +id });
  const [updateGoal, { isLoading }] = useUpdateGoalMutation();

  async function onSubmit(
    values: UpdateGoalDto,
    options: FormikHelpers<UpdateGoalDto>,
  ) {
    try {
      const goal = await updateGoal(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        title: `Цель «${goal.name}» успешно обновлена!`,
        message:
          'Не забывайте регулярно отмечать свой прогресс в достижении цели',
        type: NotificationType.INFO,
        dismiss: {
          onScreen: true,
          duration: 5000,
          pauseOnHover: true,
        },
      });
      history.push(`/goals/${values.id}`);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || isLoading;
  }

  return (
    <EditGoalForm
      goal={goal}
      loader={isLoading}
      isDisabled={isDisabled}
      onSubmit={onSubmit}
    />
  );
};
export default EditGoal;
