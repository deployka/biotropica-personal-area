import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';

import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';

import s from './ForgotForm.module.scss';
import { SchemaOf } from 'yup';
import { ForgotPasswordDto } from '../../../../@types/dto/auth/forgot-password.dto';
interface Props {
  onSubmit: (
    values: ForgotPasswordDto,
    options: FormikHelpers<ForgotPasswordDto>,
  ) => void;
  loader: boolean;
  validationSchema: SchemaOf<ForgotPasswordDto>;
  email: string;
}

export const ForgotForm = ({
  loader,
  onSubmit,
  validationSchema,
  email,
}: Props) => {
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }
  return (
    <>
      <Formik
        initialValues={{
          email: email,
        }}
        validateOnBlur
        onSubmit={(
          values: ForgotPasswordDto,
          options: FormikHelpers<ForgotPasswordDto>,
        ) => onSubmit(values, options)}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={s.form__wrapper}>
            <h1 className={s.title}>Восстановление пароля</h1>
            <div className={s.form}>
              <h2 className={s.subtitle}>
                На ваш e-mail будет отправлена ссылка для смены пароля
              </h2>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  type="email"
                  options={{ touched, errors }}
                />
              </div>

              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: loader ? <Loader /> : 'Продолжить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                  width: '100%',
                  height: '50px',
                }}
              />
            </div>
            <Link className={s.signin} to="/signin">
              Помните свой пароль? Вернуться на страницу входа
            </Link>
          </div>
        )}
      </Formik>
    </>
  );
};
