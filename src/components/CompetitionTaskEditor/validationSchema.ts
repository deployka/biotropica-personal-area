import * as yup from 'yup';

export default yup.object().shape({
  title: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите название'),
  kindOfSport: yup.string().required('Выберите вид спорта'),
  competitionType: yup.string().required('Выберите тип соревнования'),
  priority: yup.string().required('Выберите приоритет'),
  date: yup.mixed<Date | null>().required('Выберите дату'),
  targetValue: yup.number().positive('Должно быть больше 0').required('Выберите плановое значение'),
});
