import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { useHistory, useLocation } from 'react-router';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import EditGoalForm from '../../components/Goals/EditForm/GoalEditForm';
import { eventBus, EventTypes } from '../../services/EventBus';
import { UpdateGoalDto } from '../../@types/dto/goals/update.dto';
import { useGetGoalQuery, useUpdateGoalMutation } from '../../api/goals';

const EditGoal = () => {
  const history = useHistory();
  const location = useLocation();

  const id = location.pathname.split('/')[3];

  const { data: goal } = useGetGoalQuery({ id: +id });
  const [updateGoal, { isLoading }] = useUpdateGoalMutation();

  const [name, setName] = useState<string>('');

  async function onSubmit(
    values: UpdateGoalDto,
    options: FormikHelpers<UpdateGoalDto>,
  ) {
    try {
      setName(values?.name || '');
      await updateGoal(values).unwrap();
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
      history.push(`/goals/${values.id}`);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: `Произошла ошибка!`,
        message: (error as { message: string }).message,
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
