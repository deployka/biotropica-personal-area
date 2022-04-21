import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  text: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите название файла')
    .max(35, 'Максимальная длина 35 символов'),
  filePath: yup
    .mixed()
    .required('Файл обязателен')
    .test('fileFormat', 'Только pdf', value => {
      return value && ['application/pdf'].includes(value.type);
    }),
});
