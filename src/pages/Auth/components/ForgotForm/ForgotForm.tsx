import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchForgotPassword } from '../../../../store/ducks/user/actionCreators';
import { ForgotPasswordData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik } from 'formik';

import s from './ForgotForm.module.scss';
import { validationSchema } from './validationSchema';
import { selectUserResponse } from '../../../../store/ducks/user/selectors';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import { ERROR_SERVER_CODES } from '../../../../constants/errors-server-list';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';

interface Props {
  loadingStatus: string;
}

export const ForgotForm = ({ loadingStatus }: Props) => {
  const dispatch = useDispatch();
  const response = useSelector(selectUserResponse);
  const location = useLocation();
  const history = useHistory();
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
    }

    if (loadingStatus === LoadingStatus.SUCCESS && refSetFieldValue.current) {
      refSetFieldValue.current?.('email', '');
      setTimeout(() => {
        history.push('/signin');
      }, 2000);
    }
  }, [loadingStatus]);

  async function onSubmit(values: ForgotPasswordData, options: any) {
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
                style={response?.message ? { display: 'flex' } : {}}
                className={classNames({
                  [s.error__server]: ERROR_SERVER_CODES.includes(
                    response?.statusCode
                  ),
                  [s.success__server]: response?.statusCode === 200,
                })}
              >
                {response?.message}
              </div>

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
