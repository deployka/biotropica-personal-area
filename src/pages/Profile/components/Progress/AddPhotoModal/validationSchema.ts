import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  FRONT: yup
    .mixed()
    .required('Фото обязательно')
    .test('fileFormat', 'Только jpg gif png', value => {
      console.log(value);
      return (
        value && ['image/gif', 'image/png', 'image/jpeg'].includes(value.type)
      );
    }),
  BACK: yup
    .mixed()
    .required('Фото обязательно')
    .test('fileFormat', 'Только jpg gif png', value => {
      console.log(value);
      return (
        value && ['image/gif', 'image/png', 'image/jpeg'].includes(value.type)
      );
    }),
  SIDE: yup
    .mixed()
    .required('Фото обязательно')
    .test('fileFormat', 'Только jpg gif png', value => {
      console.log(value);
      return (
        value && ['image/gif', 'image/png', 'image/jpeg'].includes(value.type)
      );
    }),
});
