import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSignup } from '../../../../store/ducks/user/actionCreators';
import { SignupData } from '../../../../store/ducks/user/contracts/state';
import { LoadingStatus } from '../../../../store/types';
import { Formik } from 'formik';

import s from './SignupForm.module.scss';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../../utils/phoneValidator';
import { validationSchema } from './validationSchema';
import { selectUserErrors } from '../../../../store/ducks/user/selectors';
import { Loader } from '../../../../shared/Global/Loader/Loader';

interface Props {
  setRedirect: Dispatch<SetStateAction<boolean>>;
  loadingStatus: string;
}

let setFieldValue: any = null;

export const SignupForm = ({ setRedirect, loadingStatus }: Props) => {
  const dispatch = useDispatch();
  const [errorValue, errorText] =
    useSelector(selectUserErrors)?.message?.split(':') || [];

  const [loader, setLoader] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }

    if (loadingStatus === LoadingStatus.ERROR && sending) {
      errorValue && setFieldValue(errorValue, '');
    }
  }, [loadingStatus]);

  async function onSubmit(values: SignupData, options: any) {
    if (!checked) {
      return;
    }
    setFieldValue = options.setFieldValue;
    try {
      setSending(true);
      setLoader(true);
      dispatch(fetchSignup(values));
      setRedirect(true);
    } catch (error) {
      setLoader(false);
    }
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
        onSubmit={(values: SignupData, options) => onSubmit(values, options)}
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
            <div
              style={
                errorText && loadingStatus === LoadingStatus.ERROR
                  ? { display: 'flex' }
                  : {}
              }
              className={s.error__server}
            >
              {errorText}
            </div>

            <div className={s.input__wrapper_name}>
              <input
                className={classNames({
                  [s.input]: true,
                  [s.success__input]: touched.name && !errors.name,
                  [s.error__input]: touched.name && errors.name,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Имя"
                name="name"
                value={values.name}
                type="text"
              />

              {touched.name && errors.name && (
                <span className={s.error}>{errors.name}</span>
              )}
            </div>

            <div className={s.input__wrapper_lastname}>
              <input
                className={classNames({
                  [s.input]: true,
                  [s.success__input]: touched.lastname && !errors.lastname,
                  [s.error__input]: touched.lastname && errors.lastname,
                })}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Фамилия"
                name="lastname"
                value={values.lastname}
                type="text"
              />
              {touched.lastname && errors.lastname && (
                <span className={s.error}>{errors.lastname}</span>
              )}
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
              <input
                className={classNames({
                  [s.input]: true,
                  [s.success__input]: touched.phone && !errors.phone,
                  [s.error__input]: touched.phone && errors.phone,
                })}
                onChange={handleChange}
                onKeyDown={onPhoneKeyDown}
                onInput={onPhoneInput}
                onPaste={onPhonePaste}
                onBlur={handleBlur}
                placeholder="Телефон"
                name="phone"
                value={values.phone}
                type="phone"
              />
              {touched.phone && errors.phone && (
                <span className={s.error}>{errors.phone}</span>
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
              disabled={(!isValid && !dirty) || !checked || loader}
              type="submit"
              onClick={() => handleSubmit()}
              className={classNames({
                [s.btn]: true,
                [s.disabled]: (!isValid && !dirty) || !checked || loader,
              })}
            >
              {loader ? <Loader /> : 'Зарегистрироваться'}
            </button>

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
                Нажимая кнопку «Зарегистрироваться», вы принимаете условия
                пользовательского соглашения
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
