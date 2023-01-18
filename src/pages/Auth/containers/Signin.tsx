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

      options.resetForm();

    } catch (error) {
      options.setFieldValue('password', '');
      eventBus.emit(EventTypes.notification, {
        message: (error as any)?.data?.message || 'Произошла ошибка',
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
