import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .typeError('Должно быть строкой')
    .email('Некорректный email')
    .required('Введите адрес электронной почты'),
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите пароль')
    .min(5, 'Пароль должен быть более 5 символов'),
});
