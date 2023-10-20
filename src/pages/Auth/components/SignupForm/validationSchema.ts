import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().typeError('Должно быть строкой').required('Введите имя'),
  lastname: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите фамилию'),
  email: yup
    .string()
    .typeError('Должно быть строкой')
    .email('Некорректный email')
    .required('Введите адрес электронной почты'),
  phone: yup
    .string()
    .typeError('Должно быть строкой')
    .test(
      'minLen',
      'Номер не должен быть короче 10 цифр',
      str => (str || '').length > 11,
    )
    .test(
      'maxLen',
      'Номер не должен быть длиннее 15 цифр',
      str => (str || '').length < 17,
    )
    .required('Введите телефон'),
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите пароль')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(/[a-z]/, 'Не хватает латинской строчной буквы')
    .matches(/[A-Z]/, 'Не хватает латинской заглавной буквы')
    .matches(/[0-9]{1}/, 'Не хватает цифры'),
  verificationPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
  specializationKeys: yup.array().min(1, 'Выберите специальность'),
});
