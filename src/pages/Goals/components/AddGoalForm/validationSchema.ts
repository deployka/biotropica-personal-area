import * as yup from 'yup';
import {
  GoalType,
  GoalUnits,
} from '../../../../store/ducks/goal/contracts/state';

export const validationSchema = (type: GoalType) => () => {
  const end_result_weight = yup
    .number()
    .positive()
    .typeError('Должен быть числом')
    .required('Введите желаемый результат')
    .min(1, 'Минимальный результат: 1')
    .max(1000, 'Максимальный результат: 1000');

  const end_result = end_result_weight.moreThan(
    yup.ref('start_result'),
    'Не может быть меньше стартового результата'
  );
  const isWeight = type === GoalType.WEIGHT ? true : false;
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
      })
    ),
    end_result: isWeight ? end_result_weight : end_result,
    start_result: yup
      .number()
      .typeError('Должен быть числом')
      .required('Введите текущий результат')
      .max(999, 'Максимальный результат: 999')
      .positive(),
  });
};
