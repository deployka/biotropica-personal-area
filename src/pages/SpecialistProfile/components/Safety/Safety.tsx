import React from 'react';
import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import s from './Safety.module.scss';

import Button from '../../../../components/Button/Button';
import Input, { InputTypes } from '../../../../components/Input/Input';
import validationSchema from './editPassword';
import { useRequestChangePasswordMutation } from '../../../../store/rtk/requests/auth';
import { RootState } from '../../../../store/store';
// import { showSuccessMessage, showErrorMessage } from '../../../../components/notification/messages';
import { Loader } from '../../../../shared/Global/Loader/Loader';
import { setIsLoggedOut } from '../../../../store/rtk/slices/user';

interface ChangePasswordData {
  currentPassword: string;
  password: string;
  verificationPassword: string;
}

export const Safety = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [requestChangePassword, { isLoading, isSuccess, isError }] = useRequestChangePasswordMutation();

  const user = useSelector((state: RootState) => state.user.user);

  React.useEffect(() => {
    if (isSuccess) {
      // TODO: уведомление
      // showSuccessMessage('Пароль успешно изменен');

      dispatch(setIsLoggedOut());
      history.push('/signin');
    }

    // isError &&
    // showErrorMessage('Неверно введен старый пароль, попробуйте еще раз');
  }, [isSuccess, isError]);

  const handleSubmit = (values: ChangePasswordData) => {
    requestChangePassword(values);
  };

  if (!user) {
    return <div></div>;
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={s.edit__password}>
        <Formik
          initialValues={{
            password: '',
            currentPassword: '',
            verificationPassword: '',
          }}
          validateOnBlur
          onSubmit={(values: ChangePasswordData) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {({
            values,
            isValid,
            dirty,
            handleBlur,
            handleChange,
          }) => (
            <Form>
              <div className={s.form}>
                <div className={s.input__wrapper}>
                  {/* <Link
                    to={`/forgot-password?email=${''}`}
                    className={s.forgot}
                  >
                    Восстановить
                  </Link> */}
                  <Input
                    name="currentPassword"
                    placeholder="Старый пароль"
                    type={InputTypes.PASSWORD}
                    value={values.currentPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.input__wrapper}>
                  <Input
                    name="password"
                    placeholder="Новый пароль"
                    autoComplete="new-password"
                    value={values.password}
                    type={InputTypes.PASSWORD}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.input__wrapper}>
                  <Input
                    name="verificationPassword"
                    placeholder="Повторите пароль"
                    value={values.verificationPassword}
                    type={InputTypes.PASSWORD}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.button__wrapper}>
                  <Button className={s.cancelBtn}>
                    <Link to={'/profile/' + user.id}>
                      Отмена
                    </Link>
                  </Button>
                  <Button
                    type="submit"
                    className={s.submitBtn}
                    isPrimary
                    isDisabled={!(isValid && dirty)}
                  >
                    Сохранить
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Safety;
