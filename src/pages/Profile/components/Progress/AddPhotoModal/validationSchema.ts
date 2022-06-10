import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  front: yup
    .mixed()
    .required('Фото обязательно')
    .test('fileFormat', 'Только jpg gif png', value => {
      return (
        value && ['image/gif', 'image/png', 'image/jpeg'].includes(value.type)
      );
    }),
  back: yup
    .mixed()
    .required('Фото обязательно')
    .test('fileFormat', 'Только jpg gif png', value => {
      return (
        value && ['image/gif', 'image/png', 'image/jpeg'].includes(value.type)
      );
    }),
  side: yup
    .mixed()
    .required('Фото обязательно')
    .test('fileFormat', 'Только jpg gif png', value => {
      return (
        value && ['image/gif', 'image/png', 'image/jpeg'].includes(value.type)
      );
    }),
});
