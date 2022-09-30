import * as yup from 'yup';

export default yup.object().shape({
  banReason: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите причину блокировки'),
});
