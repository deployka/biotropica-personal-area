import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Введите название'),
  cost: yup
    .number()
    .min(1, 'Цена должна быть больше 0')
    .required('Обязательно поле'),
});
