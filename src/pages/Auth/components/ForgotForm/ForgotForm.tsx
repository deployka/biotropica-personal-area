import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchForgotPassword } from '../../../../store/ducks/user/actionCreators';
import { ForgotPasswordData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik } from 'formik';

import s from './ForgotForm.module.scss';
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

export const ForgotForm = ({ loadingStatus }: Props) => {
  const dispatch = useDispatch();
  const errorsServer = useSelector(selectUserErrors);
  const responseServer = useSelector(selectUserResponse);
  const location = useLocation();
  const history = useHistory();
  const email = location.search.split('=')[1];

  const [loader, setLoader] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }

    if (loadingStatus === LoadingStatus.ERROR && sending) {
      setFieldValue?.('email', '');
    }

    if (loadingStatus === LoadingStatus.SUCCESS && sending) {
      setFieldValue?.('email', '');
      setTimeout(() => {
        history.push('/signin');
      }, 2000);
    }
  }, [loadingStatus]);

  async function onSubmit(values: ForgotPasswordData, options: any) {
    setFieldValue = options.setFieldValue;
    try {
      setLoader(true);
      dispatch(fetchForgotPassword(values));
      setSending(true);
    } catch (error) {
      setLoader(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          email: email,
        }}
        validateOnBlur
        onSubmit={(values: ForgotPasswordData, options) =>
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
            <h1 className={s.title}>Восстановление пароля</h1>
            <div className={s.form}>
              <h2 className={s.subtitle}>
                На ваш e-mail будет отправлена ссылка для смены пароля
              </h2>
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
                    [s.success__input]: touched.email && !errors.email,
                    [s.error__input]: touched.email && errors.email,
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  type="email"
                />
                {touched.email && errors.email && (
                  <span className={s.error}>{errors.email}</span>
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
                {loader ? <Loader /> : 'Продолжить'}
              </button>
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
