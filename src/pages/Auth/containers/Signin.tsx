import React from 'react';
import { FormikHelpers } from 'formik';
import { SigninForm } from '../components/SigninForm/SigninForm';
import { validationSchema } from '../components/SigninForm/validationSchema';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { SignInDto } from '../../../@types/dto/auth/signin.dto';
import { useSignInMutation } from '../../../api/auth';

const Signin = () => {
  const [signIn, { isLoading }] = useSignInMutation();

  async function onSubmit(
    values: SignInDto,
    options: FormikHelpers<SignInDto>,
  ) {
    try {
      await signIn(values).unwrap();

      eventBus.emit(EventTypes.notification, {
        message: 'Вход выполнен!',
        type: NotificationType.SUCCESS,
      });

      eventBus.emit(EventTypes.notification, {
        title: 'Внимание!',
        message:
          'Проводятся технические работы с системой оплаты тарифных планов. Вам доступны основные функции личного кабинета, кроме взаимодействия со специалистами Biotropika. Мы работаем над устранением проблемы',
        autoClose: false,
        type: NotificationType.INFO,
      });

      options.resetForm();
    } catch (error) {
      options.setFieldValue('password', '');
      eventBus.emit(EventTypes.notification, {
        message: 'Неверный логин или пароль!',
        type: NotificationType.DANGER,
      });
    }
  }

  return (
    <div className="formContainer">
      <SigninForm
        onSubmit={onSubmit}
        loader={isLoading}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default Signin;
