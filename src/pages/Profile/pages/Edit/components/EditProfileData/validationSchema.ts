import * as yup from 'yup';
const phoneRegExp =
  /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

const data =
  /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

export const validationSchema = yup.object().shape({
  name: yup.string().typeError('Должно быть строкой').required('Введите имя'),
  lastname: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите фамилию'),
  patronymic: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Введите отчество'),
  dob: yup
    .date()
    .typeError('Должно быть датой')
    .required('Выберите дату рождения'),
  gender: yup.array().required('Выберите гендер'),
  phone: yup
    .string()
    .typeError('Должно быть строкой')
    .matches(phoneRegExp, 'Некорректный номер телефона')
    .required('Введите телефон'),
  email: yup
    .string()
    .typeError('Должно быть строкой')
    .email('Некорректный email')
    .required('Введите адрес электронной почты'),
});
