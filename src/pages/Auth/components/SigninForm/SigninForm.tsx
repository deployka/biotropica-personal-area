import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchSignin,
  setUserResponse,
} from '../../../../store/ducks/user/actionCreators';
import { SigninData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik, FormikHelpers } from 'formik';

import s from './SigninForm.module.scss';
import { validationSchema } from './validationSchema';
import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../../store/ducks/user/selectors';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';

import { store } from 'react-notifications-component';
import { notification } from '../../../../config/notification/notificationForm';
interface Props {}

export const SigninForm = ({}: Props) => {
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
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message || 'Произошла непредвиденная ошибка!',
        type: 'danger',
      });
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
    }
  }, [loadingStatus]);

  async function onSubmit(
    values: SigninData,
    options: FormikHelpers<SigninData>
  ) {
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
        onSubmit={(values: SigninData, options: FormikHelpers<SigninData>) =>
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
              <Link
                to={`/forgot-password?email=${values.email}`}
                className={s.forgot}
              >
                Восстановить
              </Link>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Пароль"
                name="password"
                value={values.password}
                type="password"
                options={{ touched, errors }}
              />
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
          </div>
        )}
      </Formik>
    </>
  );
};
