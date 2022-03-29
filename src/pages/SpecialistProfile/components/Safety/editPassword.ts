import * as yup from 'yup';

export default yup.object().shape({
  currentPassword: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите пароль')
    .min(5, 'Пароль должен быть более 5 символов'),
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите пароль')
    .min(5, 'Пароль должен быть более 5 символов'),
  verificationPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
});
