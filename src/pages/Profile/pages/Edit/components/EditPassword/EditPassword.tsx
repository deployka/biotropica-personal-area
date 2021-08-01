import classNames from 'classnames';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { notification } from '../../../../../../config/notification/notificationForm';
import { Button } from '../../../../../../shared/Form/Button/Button';
import { Input } from '../../../../../../shared/Form/Input/Input';
import { Loader } from '../../../../../../shared/Form/Loader/Loader';
import {
  fetchChangePassword,
  fetchSignout,
  setUserResponse,
} from '../../../../../../store/ducks/user/actionCreators';
import { ChangePasswordData } from '../../../../../../store/ducks/user/contracts/state';
import {
  selectUserData,
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../../../../store/types';

import s from './EditPassword.module.scss';
import { validationSchema } from './validationSchema';

import { store } from 'react-notifications-component';

interface Props {}

export const EditPassword = ({}: Props) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const response = useSelector(selectUserResponse);
  const user = useSelector(selectUserData);
  const refSetFieldValue = useRef<any>(null);
  const refResetForm = useRef<any>(null);

  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (loadingStatus === LoadingStatus.ERROR && refSetFieldValue.current) {
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message,
        type: 'danger',
      });
      refSetFieldValue.current('current_password', '');
    }
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS && refResetForm.current) {
      store.addNotification({
        ...notification,
        title: 'Успешно!',
        message: response?.message,
        type: 'success',
      });
      refResetForm.current();
    }
    dispatch(setUserResponse(undefined));
  }, [loadingStatus]);

  async function onSubmit(values: ChangePasswordData, options: any) {
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
    try {
      dispatch(fetchChangePassword(values));
    } catch (error) {}
  }

  async function logout() {
    dispatch(fetchSignout());
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  return (
    <div className={s.edit__password}>
      <Formik
        initialValues={{
          current_password: '',
          password: '',
          verification_password: '',
        }}
        validateOnBlur
        onSubmit={(values: ChangePasswordData, options) =>
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
            <div className={s.input__wrapper}>
              <Link
                to={`/forgot-password?email=${user?.email || ''}`}
                onClick={logout}
                className={s.forgot}
              >
                Восстановить
              </Link>

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Старый пароль"
                name="current_password"
                value={values.current_password}
                type="password"
                options={{
                  touched,
                  errors,
                  classes: { [s.input__current_password]: true },
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
                name="verification_password"
                value={values.verification_password}
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
                  content: loader ? <Loader /> : 'Сохранить',
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
