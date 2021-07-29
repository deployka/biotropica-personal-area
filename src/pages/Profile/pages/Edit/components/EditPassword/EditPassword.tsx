import classNames from 'classnames';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../../../shared/Form/Loader/Loader';
import {
  fetchChangePassword,
  fetchSignout,
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
      refSetFieldValue.current('current_password', '');
    }
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS && refResetForm.current) {
      refResetForm.current();
    }
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
            <div
              style={response?.message ? { display: 'flex' } : {}}
              className={classNames({
                [s.error__server]:
                  response?.statusCode === 401 || response?.statusCode === 400,
                [s.success__server]: response?.statusCode === 200,
              })}
            >
              {response?.message}
            </div>

            <div className={s.input__wrapper}>
              <Link
                to={`/forgot-password?email=${user?.email || ''}`}
                onClick={logout}
                className={s.forgot}
              >
                Восстановить
              </Link>
              <input
                className={classNames({
                  [s.input]: true,
                  [s.input__current_password]: true,
                  [s.success__input]:
                    touched.current_password && !errors.current_password,
                  [s.error__input]:
                    touched.current_password && errors.current_password,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Старый пароль"
                name="current_password"
                value={values.current_password}
                type="password"
              />
              {touched.current_password && errors.current_password && (
                <span className={s.error}>{errors.current_password}</span>
              )}
            </div>

            <div className={s.input__wrapper}>
              <input
                className={classNames({
                  [s.input]: true,
                  [s.success__input]: touched.password && !errors.password,
                  [s.error__input]: touched.password && errors.password,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Новый пароль"
                name="password"
                autoComplete="new-password"
                value={values.password}
                type="password"
              />
              {touched.password && errors.password && (
                <span className={s.error}>{errors.password}</span>
              )}
            </div>

            <div className={s.input__wrapper}>
              <input
                className={classNames({
                  [s.input]: true,
                  [s.success__input]:
                    touched.verification_password &&
                    !errors.verification_password,
                  [s.error__input]:
                    touched.verification_password &&
                    errors.verification_password,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Повторите пароль"
                name="verification_password"
                value={values.verification_password}
                type="password"
              />
              {touched.verification_password &&
                errors.verification_password && (
                  <span className={s.error}>
                    {errors.verification_password}
                  </span>
                )}
            </div>

            <div className={s.button__wrapper}>
              <button
                disabled={(!isValid && !dirty) || loader}
                type="submit"
                onClick={() => handleSubmit()}
                className={classNames({
                  [s.btn]: true,
                  [s.disabled]: (!isValid && !dirty) || loader,
                })}
              >
                {loader ? <Loader /> : 'Сохранить'}
              </button>

              <Link to="/profile">
                <button
                  className={classNames({
                    [s.btn]: true,
                    [s.btn__discard]: true,
                  })}
                >
                  Отменить
                </button>
              </Link>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
