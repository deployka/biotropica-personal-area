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
      str => (str || '').length < 16,
    )
    .required('Введите телефон'),
  roles: yup.array().length(1, 'Выберите роль').required('Выберите роль'),
});
