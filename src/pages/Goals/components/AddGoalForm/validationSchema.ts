import * as yup from 'yup';
import { GoalUnits } from '../../../../store/ducks/goal/contracts/state';

export const validationSchema = yup.object().shape({
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
  end_result: yup
    .number()
    .positive()
    .typeError('Должен быть числом')
    .required('Введите желаемый результат')
    .min(1, 'Минимальный результат: 1')
    .max(1000, 'Максимальный результат: 1000')
    .moreThan(
      yup.ref('start_result'),
      'Не может быть меньше стартового результата'
    ),
  start_result: yup
    .number()
    .typeError('Должен быть числом')
    .required('Введите текущий результат')
    .max(999, 'Максимальный результат: 999')
    .positive(),
});
