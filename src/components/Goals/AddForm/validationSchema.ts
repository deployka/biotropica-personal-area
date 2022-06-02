import * as yup from 'yup';
import { GoalType } from '../../../store/ducks/goal/contracts/state';

export const validationSchema = (type: GoalType) => () => {
  const isWeight = type === GoalType.WEIGHT;

  const template = yup
    .number()
    .positive('Результат должен быть больше 0')
    .typeError('Должен быть числом')
    .required('Введите желаемый результат')
    .min(1, 'Минимальный результат: 1')
    .max(1000, 'Максимальный результат: 1000');

  const endResult = isWeight
    ? template
    : template.moreThan(
        yup.ref('startResult'),
        'Не может быть меньше стартового результата',
      );

  return yup.object().shape({
    name: yup
      .string()
      .typeError('Должна быть строкой')
      .required('Введите название цели')
      .max(35, 'Максимальная длина 35 символов'),
    description: yup.string().max(80, 'Максимальная длина 80 символов'),
    units: yup.array().of(
      yup.object().shape({
        value: yup
          .mixed<Partial<GoalUnits>>()
          .required('Выберите единицы измерения')
          .typeError('Выберите единицы измерения'),
      }),
    ),
    endResult: endResult.notOneOf(
      [yup.ref('startResult')],
      'Результаты не могут быть равны',
    ),
    startResult: yup
      .number()
      .typeError('Должен быть числом')
      .required('Введите текущий результат')
      .max(999, 'Максимальный результат: 999')
      .nullable()
      .moreThan(-1, 'Результат не может быть отрицательным')
      .notOneOf([yup.ref('endResult')], 'Результаты не могут быть равны'),
  });
};
