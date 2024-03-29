import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Введите название'),
  kindOfSport: yup.string().required('Выберите вид спорта'),
  category: yup.string().required('Выберите категорию'),
  firstTargetType: yup.string().required('Выберите плановое значение'),
  secondTargetType: yup.string().required('Выберите плановое значение'),
  firstTargetValue: yup.string().required('Выберите плановое значение'),
  secondTargetValue: yup.string().required('Выберите плановое значение'),
  date: yup.mixed<Date | null>().required('Выберите дату'),
  // time: yup.string().required('Введите время')
});
