import * as yup from 'yup';

export default yup.object().shape({
  time: yup.string().required('Выберите время'),
  date: yup.string().required('Выберите дату'),
});
