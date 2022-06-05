import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  value: yup
    .number()
    .typeError('Должно быть числом')
    .required('Текущий результат обязателен')
    .min(1, 'Минимальный результат: 1')
    .max(2000, 'Максимальный результат: 2000'),

  createdAt: yup
    .date()
    .typeError('Должно быть датой')
    .required('Выберите дату рождения'),
});
