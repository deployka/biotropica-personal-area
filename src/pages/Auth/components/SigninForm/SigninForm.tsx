import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchSignin,
  setUserResponse,
} from '../../../../store/ducks/user/actionCreators';
import { SigninData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik } from 'formik';

import s from './SigninForm.module.scss';
import { validationSchema } from './validationSchema';
import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../../store/ducks/user/selectors';
import { Loader } from '../../../../shared/Form/Loader/Loader';

interface Props {
  setRedirect: Dispatch<SetStateAction<boolean>>;
}

export const SigninForm = ({ setRedirect }: Props) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const response = useSelector(selectUserResponse);

  const [loader, setLoader] = useState<boolean>(false);
  const refSetFieldValue = useRef<any>(null);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (loadingStatus === LoadingStatus.ERROR && refSetFieldValue.current) {
      refSetFieldValue.current('password', '');
    }
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS) {
      dispatch(setUserResponse(undefined));
      setRedirect(true);
    }
  }, [loadingStatus]);

  async function onSubmit(values: SigninData, options: any) {
    refSetFieldValue.current = options.setFieldValue;
    try {
      dispatch(fetchSignin(values));
    } catch (error) {}
  }

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
        onSubmit={(values: SigninData, options) => onSubmit(values, options)}
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
            <div
              style={response?.message ? { display: 'flex' } : {}}
              className={s.error__server}
            >
              {response?.message}
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

            <div className={s.input__wrapper}>
              <Link
                to={`/forgot-password?email=${values.email}`}
                className={s.forgot}
              >
                Восстановить
              </Link>
              <input
                className={classNames({
                  [s.input]: true,
                  [s.input__current_password]: true,
                  [s.success__input]: touched.password && !errors.password,
                  [s.error__input]: touched.password && errors.password,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Пароль"
                name="password"
                value={values.password}
                type="password"
              />
              {touched.password && errors.password && (
                <span className={s.error}>{errors.password}</span>
              )}
            </div>

            <button
              disabled={isDisabled(isValid, dirty)}
              type="submit"
              onClick={() => handleSubmit()}
              className={classNames({
                [s.btn]: true,
                [s.disabled]: isDisabled(isValid, dirty),
              })}
            >
              {loader ? <Loader /> : 'Войти'}
            </button>

            <Link className={s.signin} to="/signup">
              Нет учетной записи? Создайте сейчас
            </Link>
          </div>
        )}
      </Formik>
    </>
  );
};