import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите имя')
    .max(24, 'Максимальная длина 24 символа'),
  lastname: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите фамилию')
    .max(24, 'Максимальная длина 24 символа'),
  patronymic: yup
    .string()
    .typeError('Должно быть строкой')
    .max(35, 'Максимальная длина 35 символов'),
  dob: yup.mixed<Date | null>().typeError('Должно быть датой'),
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
  email: yup
    .string()
    .typeError('Должно быть строкой')
    .email('Некорректный email')
    .required('Введите адрес электронной почты'),
});
