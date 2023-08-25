import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';
import { Link } from 'react-router-dom';
import { SchemaOf } from 'yup';
import { SignInDto } from '../../../../@types/dto/auth/signin.dto';
import eyeIcon from './../../../../assets/icons/eye.svg';
import eyeCloseIcon from './../../../../assets/icons/eyeClose.svg';

import s from './SigninForm.module.scss';

interface Props {
  onSubmit: (values: SignInDto, options: FormikHelpers<SignInDto>) => void;
  loader: boolean;
  validationSchema: SchemaOf<SignInDto>;
}

export const SigninForm = ({ onSubmit, loader, validationSchema }: Props) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values: SignInDto, options: FormikHelpers<SignInDto>) =>
          onSubmit(values, options)
        }
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
          <div className={s.form}>
            <h1 className={s.title}>Вход</h1>
            <h2 className={s.subtitle}>
              Пожалуйста, заполните информацию ниже:
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

            <div className={s.input__wrapper}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Пароль"
                name="password"
                value={values.password}
                type={isVisiblePassword ? 'text' : 'password'}
                options={{ touched, errors }}
              />
              <div
                className={s.icon}
                onClick={() => {
                  setIsVisiblePassword(!isVisiblePassword);
                }}
              >
                {isVisiblePassword ? (
                  <img src={eyeCloseIcon} />
                ) : (
                  <img src={eyeIcon} />
                )}
              </div>
              <Link
                to={`/forgot-password?email=${values.email}`}
                className={s.forgot}
              >
                Забыли пароль?
              </Link>
            </div>

            <Button
              disabled={isDisabled(isValid, dirty)}
              type="submit"
              onClick={() => handleSubmit()}
              options={{
                content: loader ? <Loader /> : 'Войти',
                setDisabledStyle: isDisabled(isValid, dirty),
                width: '100%',
                height: '50px',
              }}
            />

            <Link className={s.signin} to="/signup">
              Нет учетной записи? Создайте сейчас
            </Link>
            <a className={s.signin} href="https://biotropika.ru/instruction/">
               Инструкция по установке приложения
               "Дневник спортсмена"
            </a>
          </div>
        )}
      </Formik>
    </>
  );
};
