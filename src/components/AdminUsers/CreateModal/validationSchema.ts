import * as yup from 'yup';
const phoneRegExp =
  // eslint-disable-next-line
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
  roles: yup.array().length(1, 'Выберите роль').required('Выберите роль'),
});
