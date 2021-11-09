import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchForgotPassword } from '../../../../store/ducks/user/actionCreators';
import { ForgotPasswordData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik, FormikHelpers } from 'formik';

import { validationSchema } from './validationSchema';
import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../../store/ducks/user/selectors';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';
import { notification } from '../../../../config/notification/notificationForm';
import { store } from 'react-notifications-component';

import s from './ForgotForm.module.scss';
interface Props {}

export const ForgotForm = ({}: Props) => {
  const dispatch = useDispatch();
  const response = useSelector(selectUserResponse);
  const location = useLocation();
  const history = useHistory();

  const loadingStatus = useSelector(selectUserLoadingStatus);
  const email = location.search.split('=')[1];

  const [loader, setLoader] = useState<boolean>(false);
  const refSetFieldValue = useRef<any>(null);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }

    if (loadingStatus === LoadingStatus.ERROR && refSetFieldValue.current) {
      refSetFieldValue.current?.('email', '');
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message || 'Произошла непредвиденная ошибка!',
        type: 'danger',
      });
    }

    if (loadingStatus === LoadingStatus.SUCCESS && refSetFieldValue.current) {
      store.addNotification({
        ...notification,
        title: 'Успешно!',
        message: response?.message || 'Успешно!',
        type: 'success',
      });
      history.push('/signin');
    }
  }, [loadingStatus]);

  async function onSubmit(
    values: ForgotPasswordData,
    options: FormikHelpers<ForgotPasswordData>
  ) {
    refSetFieldValue.current = options.setFieldValue;
    try {
      dispatch(fetchForgotPassword(values));
    } catch (error) {}
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: email,
        }}
        validateOnBlur
        onSubmit={(
          values: ForgotPasswordData,
          options: FormikHelpers<ForgotPasswordData>
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
            <h1 className={s.title}>Восстановление пароля</h1>
            <div className={s.form}>
              <h2 className={s.subtitle}>
                На ваш e-mail будет отправлена ссылка для смены пароля
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

              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: loader ? <Loader /> : 'Продолжить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                  width: '100%',
                  height: '50px',
                }}
              />
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
