import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Введите название'),
  date: yup.mixed<Date | null>().required('Выберите дату'),
  repeatType: yup.string().required('Выберите тип повторения'),
  completionType: yup.string().required('Выберите тип завершения'),
  completionValue: yup
    .number()
    .min(1, 'Не меньше 1')
    .required('Введите количество повторений'),
});
