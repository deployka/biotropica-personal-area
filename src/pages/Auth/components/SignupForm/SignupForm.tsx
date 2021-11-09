import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  fetchSignup,
  setUserResponse,
} from '../../../../store/ducks/user/actionCreators';
import { SignupData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik, FormikHelpers } from 'formik';

import s from './SignupForm.module.scss';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../../utils/phoneValidator';
import { validationSchema } from './validationSchema';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../../store/ducks/user/selectors';
import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';
import { notification } from '../../../../config/notification/notificationForm';
import { store } from 'react-notifications-component';
interface Props {}

export const SignupForm = ({}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const res = useSelector(selectUserResponse);
  const loadingStatus = useSelector(selectUserLoadingStatus);

  const [errorValue, errorText] = res?.message?.split(':') || [];

  const loader = LoadingStatus.LOADING === loadingStatus;
  const [checked, setChecked] = useState<boolean>(false);
  const refSetFieldValue = useRef<any>(null);
  const refResetForm = useRef<any>(null);

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        if (!refSetFieldValue.current) return;
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message:
            errorText || res?.message || 'Произошла непредвиденная ошибка',
          type: 'danger',
        });
        errorValue && refSetFieldValue.current(errorValue, '');
        break;
      case LoadingStatus.SUCCESS:
        if (!refResetForm.current) return;
        store.addNotification({
          ...notification,
          title: `Успешно!`,
          message: res.message,
          type: 'success',
          dismiss: {
            onScreen: true,
            duration: 7000,
            pauseOnHover: true,
          },
        });
        dispatch(setUserResponse(undefined));
        refResetForm.current();
        history.push('/signin');
        break;
      default:
        break;
    }
  }, [loadingStatus]);

  async function onSubmit(
    values: SignupData,
    options: FormikHelpers<SignupData>
  ) {
    if (!checked) {
      return;
    }
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
    try {
      dispatch(fetchSignup(values));
    } catch (error) {}
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || !checked || loader;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          verification_password: '',
          name: '',
          lastname: '',
          phone: '',
        }}
        validateOnBlur
        onSubmit={(values: SignupData, options: FormikHelpers<SignupData>) =>
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
            <h1 className={s.title}>Регистрация</h1>
            <h2 className={s.subtitle}>
              Пожалуйста, заполните информацию ниже:
            </h2>

            <div className={s.input__wrapper_name}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Имя"
                name="name"
                value={values.name}
                type="name"
                options={{ touched, errors }}
              />
            </div>

            <div className={s.input__wrapper_lastname}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Фамилия"
                name="lastname"
                value={values.lastname}
                type="text"
                options={{ touched, errors }}
              />
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

            <div className={s.input__wrapper}>
              <Input
                onChange={handleChange}
                onKeyDown={onPhoneKeyDown}
                onInput={onPhoneInput}
                onPaste={onPhonePaste}
                onBlur={handleBlur}
                placeholder="Телефон"
                name="phone"
                value={values.phone}
                type="phone"
                options={{ touched, errors }}
              />
            </div>

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
                content: loader ? <Loader /> : 'Зарегистрироваться',
                setDisabledStyle: isDisabled(isValid, dirty),
                width: '100%',
                height: '50px',
              }}
            />

            <div className={s.checkbox__wrapper}>
              <input
                onChange={() => setChecked(!checked)}
                type="checkbox"
                defaultChecked={checked}
                name="checkbox"
              />
              <label
                htmlFor="checkbox"
                className={classNames({
                  [s.checkbox]: true,
                  [s.error__checkbox]: !checked,
                })}
              ></label>
              <span>
                Нажимая кнопку «Зарегистрироваться», вы принимаете{' '}
                <a href="/policy">условия пользовательского соглашения</a>
              </span>
            </div>

            <Link className={s.signin} to="/signin">
              Уже есть учетная запись?
            </Link>
          </div>
        )}
      </Formik>
    </>
  );
};
