import * as yup from 'yup';

const timeRegExp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export default yup.object().shape({
  date: yup
    .date()
    .typeError('Выберите дату')
    .required('Выберите дату'),
  time: yup
    .string()
    .typeError('Должно быть строкой')
    .matches(timeRegExp, 'Введите время в формате 00:00')
    .required('Введите время'),
});
