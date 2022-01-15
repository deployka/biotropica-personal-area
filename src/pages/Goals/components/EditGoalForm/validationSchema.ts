import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Должна быть строкой')
    .required('Введите название цели')
    .max(35, 'Максимальная длина 35 символов'),
  description: yup.string().max(80, 'Максимальная длина 80 символов'),
  endResult: yup
    .number()
    .typeError('Должен быть числом')
    .required('Введите желаемый результат')
    .min(1, 'Минимальный результат: 1')
    .max(1000, 'Максимальный результат: 1000'),
});
