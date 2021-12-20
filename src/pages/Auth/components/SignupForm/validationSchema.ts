import * as yup from 'yup';
const phoneRegExp =
  /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

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
    .matches(phoneRegExp, 'Некорректный номер телефона')
    .required('Введите телефон'),
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите пароль')
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(/[a-z]/, 'Не хватает латинской строчной буквы')
    .matches(/[A-Z]/, 'Не хватает латинской заглавной буквы')
    .matches(/[0-9]{1}/, 'Пароль должен содержать как минимум одну цифру'),
  verification_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Повторите пароль'),
});
