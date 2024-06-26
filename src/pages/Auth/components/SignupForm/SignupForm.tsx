import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Formik, FormikHelpers } from 'formik';

import s from './SignupForm.module.scss';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../../utils/phoneValidator';
import { Loader } from '../../../../shared/Form/Loader/Loader';

import { Input } from '../../../../shared/Form/Input/Input';
import { Button } from '../../../../shared/Form/Button/Button';
import { SchemaOf } from 'yup';
import { SignUpDto } from '../../../../@types/dto/auth/signup.dto';
import { SelectCustom } from '../../../../shared/Form/Select/SelectCustom';
import { useGetSpecializationListQuery } from '../../../../api/specializations';

interface Props {
  onSubmit: (values: SignUpDto, options: FormikHelpers<SignUpDto>) => void;
  loader: boolean;
  validationSchema: SchemaOf<Omit<SignUpDto, 'role' | 'token'>>;
  showRoleSelector?: boolean;
  onBackToRole: () => void;
}

export const SignupForm = ({
  onSubmit,
  loader,
  validationSchema,
  showRoleSelector,
  onBackToRole,
}: Props) => {
  const { currentData: specList } = useGetSpecializationListQuery();
  const [checked, setChecked] = useState<boolean>(false);

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || !checked || loader;
  }

  const transformSelectValue = (value: string) => {
    const spec = specList?.find(el => el.title === value);
    if (spec) return { value: spec.key, label: spec.title };
  };

  const initialValues = {
    email: '',
    password: '',
    verificationPassword: '',
    name: '',
    lastname: '',
    phone: '',
    role: showRoleSelector
      ? process.env.REACT_APP_ROLE_TRAINER || ''
      : process.env.REACT_APP_ROLE_CLIENT || '',
    specializationKeys: showRoleSelector ? [] : ['sportsmen'],
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={(values: SignUpDto, options: FormikHelpers<SignUpDto>) => {
          if (!checked) return;
          onSubmit(values, options);
        }}
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
          setTouched,
          setFieldValue,
        }) => {
          console.log(values);
          return (
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

              {showRoleSelector && (
                <div className={s.input__wrapper}>
                  <SelectCustom
                    hideLabel
                    onChange={e => {
                      setFieldValue(
                        'specializationKeys',
                        [transformSelectValue(e.label)?.value],
                      );
                    }}
                    onBlur={() => {
                      setTouched({ ...touched, specializationKeys: true });
                    }}
                    placeholder="Специальность"
                    name="specializationKeys"
                    value={
                      values.specializationKeys
                        ? transformSelectValue(values.specializationKeys[0])
                        : undefined
                    }
                    options={specList?.map(el => ({
                      value: el.id,
                      label: el.title,
                    }))}
                    settings={{ touched, errors }}
                  />
                </div>
              )}

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
                  name="verificationPassword"
                  value={values.verificationPassword}
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
                  Нажимая кнопку «Зарегистрироваться», вы принимаете{' '}
                  <a href="/policy">условия пользовательского соглашения</a>
                </span>
              </div>

              <Link className={s.signin} to="/signin">
                Уже есть учетная запись?
              </Link>
              <Link className={s.signin} to="/signup" onClick={onBackToRole}>
                Изменить роль
              </Link>
            </div>
          );
        }}
      </Formik>
    </>
  );
};
