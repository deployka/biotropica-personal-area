import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import type { ChangePasswordDto } from '../../../@types/dto/auth/change-password.dto';

import { Button } from '../../../shared/Form/Button/Button';
import { Input } from '../../../shared/Form/Input/Input';
import { Loader } from '../../../shared/Form/Loader/Loader';

import { validationSchema } from './validationSchema';
import s from './Password.module.scss';

interface Props {
  isLoading: boolean;
  onRestorePassword: () => void;

  onSubmit: (
    values: ChangePasswordDto,
    options: FormikHelpers<ChangePasswordDto>,
  ) => void;
}

export const EditProfilePassword = ({
  isLoading,
  onSubmit,
  onRestorePassword,
}: Props) => {
  const isDisabled = (isValid: boolean, dirty: boolean) => {
    return (!isValid && !dirty) || isLoading;
  };

  return (
    <div className={s.edit__password}>
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          verificationPassword: '',
        }}
        validateOnBlur
        onSubmit={(
          values: ChangePasswordDto,
          options: FormikHelpers<ChangePasswordDto>,
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
          <div className={s.form}>
            <div className={s.input__wrapper}>
              <Link to="#" onClick={onRestorePassword} className={s.forgot}>
                Восстановить
              </Link>

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Старый пароль"
                name="currentPassword"
                value={values.currentPassword}
                type="password"
                options={{
                  touched,
                  errors,
                  classes: { [s.input__currentPassword]: true },
                }}
              />
            </div>

            <div className={s.input__wrapper}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Новый пароль"
                name="password"
                autoComplete="new-password"
                value={values.password}
                type="password"
                options={{
                  touched,
                  errors,
                }}
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
                options={{
                  touched,
                  errors,
                }}
              />
            </div>

            <div className={s.button__wrapper}>
              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: isLoading ? <Loader /> : 'Сохранить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                }}
              />

              <Link to="/profile">
                <Button
                  options={{
                    classes: { discard: true },
                    content: 'Отмена',
                  }}
                />
              </Link>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
