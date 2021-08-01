import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchRestorePassword } from '../../../../store/ducks/user/actionCreators';
import { RestorePasswordData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik } from 'formik';

import s from './RestoreForm.module.scss';
import { validationSchema } from './validationSchema';
import { selectUserResponse } from '../../../../store/ducks/user/selectors';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';
import { store } from 'react-notifications-component';
import { notification } from '../../../../config/notification/notificationForm';

interface Props {
  loadingStatus: string;
}

export const RestoreForm = ({ loadingStatus }: Props) => {
  const dispatch = useDispatch();
  const response = useSelector(selectUserResponse);
  const location = useLocation();
  const history = useHistory();
  const token = location.search?.split('=')[1];

  const [loader, setLoader] = useState<boolean>(false);
  const refSetFieldValue = useRef<any>(null);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (loadingStatus === LoadingStatus.ERROR && refSetFieldValue.current) {
      setLoader(false);
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message,
        type: 'danger',
      });
      refSetFieldValue.current('password', '');
      refSetFieldValue.current('verification_password', '');
    }
    if (loadingStatus === LoadingStatus.SUCCESS) {
      store.addNotification({
        ...notification,
        title: 'Успешно!',
        message: response?.message,
        type: 'success',
      });
      setLoader(false);
      history.push('/signin');
    }
  }, [loadingStatus]);

  async function onSubmit(values: RestorePasswordData, options: any) {
    refSetFieldValue.current = options.setFieldValue;
    try {
      dispatch(fetchRestorePassword(values));
    } catch (error) {}
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
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

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Пароль"
                  name="password"
                  autoComplete="new-password"
                  value={values.password}
                  type="password"
                  options={{ touched, errors }}
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
                  options={{ touched, errors }}
                />
              </div>

              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: loader ? <Loader /> : 'Сменить пароль',
                  setDisabledStyle: isDisabled(isValid, dirty),
                  width: '100%',
                  height: '50px',
                }}
              />
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
