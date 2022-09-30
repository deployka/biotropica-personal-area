import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';
import s from './RestoreForm.module.scss';
import { SchemaOf } from 'yup';
import { RestorePasswordDto } from '../../../../@types/dto/auth/restore-password.dto';

interface Props {
  onSubmit: (
    values: RestorePasswordDto,
    options: FormikHelpers<RestorePasswordDto>,
  ) => void;
  loader: boolean;
  validationSchema: SchemaOf<Omit<RestorePasswordDto, 'restoreToken'>>;
  type: Type;
  token: string;
}

export enum Type {
  CREATE = 'CREATE',
  CHANGE = 'CHANGE',
}

export const RestoreForm = ({
  type,
  loader,
  onSubmit,
  token,
  validationSchema,
}: Props) => {
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }
  return (
    <>
      <Formik
        initialValues={{
          password: '',
          verificationPassword: '',
          restoreToken: token,
        }}
        validateOnBlur
        onSubmit={(
          values: RestorePasswordDto,
          options: FormikHelpers<RestorePasswordDto>,
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
            <h1 className={s.title}>
              {type === Type.CHANGE ? 'Смена пароля' : 'Создание пароля'}
            </h1>
            <div className={s.form}>
              <h2 className={s.subtitle}>Введите пароли</h2>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Пароль"
                  name="password"
                  autoComplete="new-password"
                  value={values.password}
                  type="password"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Повторите пароль"
                  name="verificationPassword"
                  value={values.verificationPassword}
                  type="password"
                  options={{ touched, errors }}
                />
              </div>

              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: loader ? (
                    <Loader />
                  ) : type === Type.CHANGE ? (
                    'Сменить пароль'
                  ) : (
                    'Создать пароль'
                  ),
                  setDisabledStyle: isDisabled(isValid, dirty),
                  width: '100%',
                  height: '50px',
                }}
              />
              <Link className={s.signin} to="/signin">
                Войти
              </Link>
              <Link className={s.signin} to="/signup">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
