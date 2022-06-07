import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { useHistory } from 'react-router';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../services/EventBus';
import { ISelect } from '../../shared/Form/Select/SelectCustom';
import { Selector } from '../../components/Goals/AddSelect/Selector';
import { GoalAddSelect } from '../../components/Goals/AddSelect/AddSelect';
import { GoalAddForm } from '../../components/Goals/AddForm/AddForm';

import s from './AddGoal.module.scss';
import { GoalType, RunUnits, WeightUnits } from '../../@types/entities/Goal';
import { useCreateGoalMutation } from '../../api/goals';
import { CreateGoalFormDto } from '../../@types/dto/goals/create-form.dto';
import { CreateGoalDto } from '../../@types/dto/goals/create.dto';

const AddGoal = () => {
  const [goalTemplate, setGoalTemplate] = useState<CreateGoalFormDto>({
    type: GoalType.WEIGHT,
    units: [{ label: '', value: null }],
    description: '',
    endResult: 0,
    startResult: 0,
    name: '',
  });

  const [next, setNext] = useState(false);

  const history = useHistory();

  const [createGoal, { isLoading }] = useCreateGoalMutation();

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

  async function onSubmit(
    values: CreateGoalDto,
    options: FormikHelpers<CreateGoalDto>,
  ) {
    const goal = await createGoal({
      ...values,
      endResult: +values.endResult,
      startResult: +values.startResult,
    }).unwrap();

    eventBus.emit(EventTypes.notification, {
      title: `Цель «${goal.name}» успешно создана!`,
      message:
        'Не забывайте регулярно отмечать свой прогресс в достижении цели',
      type: NotificationType.SUCCESS,
      dismiss: {
        onScreen: true,
        duration: 7000,
        pauseOnHover: true,
      },
    });
    options.resetForm();
    history.push(`/goals/${goal.id}`);
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
    history.push('/profile');
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
