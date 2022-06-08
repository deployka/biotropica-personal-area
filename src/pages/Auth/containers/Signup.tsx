import React from 'react';
import { FormikHelpers } from 'formik';
import { useHistory } from 'react-router';

import { validationSchema } from '../components/SignupForm/validationSchema';
import { SignupForm } from '../components/SignupForm/SignupForm';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { SignUpDto } from '../../../@types/dto/auth/signup.dto';
import { useSignUpMutation } from '../../../api/auth';
import { ResponseError } from '../../../@types/api/response';

const Signup = () => {
  const history = useHistory();
  const [signUp, { isLoading }] = useSignUpMutation();

  async function onSubmit(
    values: SignUpDto,
    options: FormikHelpers<SignUpDto>,
  ) {
    try {
      await signUp(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        message:
          'Вы успешно зарегистрировались, подтвердите ваш email, перейдя по ссылке в электронном письме',
        type: NotificationType.SUCCESS,
        autoClose: 10000,
      });
      options.resetForm();
      history.push('/signin');
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }
  return (
    <div className="formContainer">
      <SignupForm
        onSubmit={onSubmit}
        loader={isLoading}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default Signup;
