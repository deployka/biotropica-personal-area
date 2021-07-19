import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchRestorePassword } from '../../../../store/ducks/user/actionCreators';
import { RestorePasswordData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik } from 'formik';

import s from './RestoreForm.module.scss';
import { validationSchema } from './validationSchema';
import {
  selectUserErrors,
  selectUserResponse,
} from '../../../../store/ducks/user/selectors';
import { Loader } from '../../../../shared/Form/Loader/Loader';

interface Props {
  loadingStatus: string;
}

let setFieldValue: any = null;

export const RestoreForm = ({ loadingStatus }: Props) => {
  const dispatch = useDispatch();
  const errorsServer = useSelector(selectUserErrors);
  const responseServer = useSelector(selectUserResponse);
  const location = useLocation();
  const history = useHistory();

  const token = location.search?.split('=')[1];

  const [loader, setLoader] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.ERROR && sending) {
      setLoader(false);
      setFieldValue('password', '');
      setFieldValue('verification_password', '');
    }
    if (loadingStatus === LoadingStatus.SUCCESS && sending) {
      setLoader(false);
      setTimeout(() => {
        history.push('/signin');
      }, 2000);
    }
  }, [loadingStatus]);

  async function onSubmit(values: RestorePasswordData, options: any) {
    setFieldValue = options.setFieldValue;
    try {
      setLoader(true);
      dispatch(fetchRestorePassword(values));
      setSending(true);
    } catch (error) {
      setLoader(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          verification_password: '',
          restoreToken: token,
        }}
        validateOnBlur
        onSubmit={(values: RestorePasswordData, options) =>
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
          <div className={s.form__wrapper}>
            <h1 className={s.title}>Смена пароля</h1>
            <div className={s.form}>
              <h2 className={s.subtitle}>Введите пароли</h2>
              <div
                style={
                  errorsServer?.message || responseServer?.message
                    ? { display: 'flex' }
                    : {}
                }
                className={classNames({
                  [s.error__server]: !!errorsServer?.message,
                  [s.success__server]: !!responseServer?.message,
                })}
              >
                {errorsServer?.message || responseServer?.message}
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
                  placeholder="Пароль"
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

              <button
                disabled={(!isValid && !dirty) || loader}
                type="submit"
                onClick={() => handleSubmit()}
                className={classNames({
                  [s.btn]: true,
                  [s.disabled]: (!isValid && !dirty) || loader,
                })}
              >
                {loader ? <Loader /> : 'Сменить пароль'}
              </button>
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
