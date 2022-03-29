import * as yup from 'yup';

export default yup.object().shape({
  title: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите название'),
  description: yup.string().required(),
});
