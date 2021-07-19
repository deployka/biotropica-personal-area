import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите пароль')
    .min(5, 'Пароль должен быть более 5 символов'),
  verification_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
});
