import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import s from './Safety.module.scss';

import Button from '../../../../components/Button/Button';
import Input, { InputTypes } from '../../../../components/Input/Input';
import validationSchema from './editPassword';
// import { showSuccessMessage, showErrorMessage } from '../../../../components/notification/messages';
import { Loader } from '../../../../shared/Global/Loader/Loader';
import { ChangePasswordDto } from '../../../../@types/dto/auth/change-password.dto';
import { BaseUser } from '../../../../@types/entities/BaseUser';

type Props = {
  user: BaseUser;
  onSubmit: (passwordData: ChangePasswordDto) => void;
};

export const Safety = ({ user, onSubmit }: Props) => {
  return (
    <div className={s.edit__password}>
      <Formik
        initialValues={{
          password: '',
          currentPassword: '',
          verificationPassword: '',
        }}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isValid, dirty, handleBlur, handleChange }) => (
          <Form>
            <div className={s.form}>
              <div className={s.input__wrapper}>
                {/* <Link
                    to={`/forgot-password?email=${''}`}
                    className={s.forgot}
                  >
                    Восстановить
                  </Link> */}
                <Input
                  name="currentPassword"
                  placeholder="Старый пароль"
                  type={InputTypes.PASSWORD}
                  value={values.currentPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className={s.input__wrapper}>
                <Input
                  name="password"
                  placeholder="Новый пароль"
                  autoComplete="new-password"
                  value={values.password}
                  type={InputTypes.PASSWORD}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className={s.input__wrapper}>
                <Input
                  name="verificationPassword"
                  placeholder="Повторите пароль"
                  value={values.verificationPassword}
                  type={InputTypes.PASSWORD}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className={s.button__wrapper}>
                <Button className={s.cancelBtn}>
                  <Link to={'/profile/' + user.id}>Отмена</Link>
                </Button>
                <Button
                  type="submit"
                  className={s.submitBtn}
                  isPrimary
                  isDisabled={!(isValid && dirty)}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Safety;
