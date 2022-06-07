import React from 'react';
import { FormikHelpers } from 'formik';
import { useHistory } from 'react-router';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { useQuery } from '../../../hooks/useQuery';
import { eventBus, EventTypes } from '../../../services/EventBus';

import { ForgotForm } from '../components/ForgotForm/ForgotForm';
import { validationSchema } from '../components/ForgotForm/validationSchema';
import { ForgotPasswordDto } from '../../../@types/dto/auth/forgot-password.dto';
import { useForgotPasswordMutation } from '../../../api/auth';

const ForgotPassword = () => {
  const query = useQuery();
  const history = useHistory();
  const email = query.get('email') || '';

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  async function onSubmit(
    values: ForgotPasswordDto,
    options: FormikHelpers<ForgotPasswordDto>,
  ) {
    try {
      const res = await forgotPassword(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: res?.message,
        type: NotificationType.DANGER,
      });
      history.push('/signin');
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка!',
        type: NotificationType.DANGER,
      });
    } finally {
      options.resetForm();
    }
  }
  return (
    <div className="formContainer">
      <ForgotForm
        onSubmit={onSubmit}
        email={email}
        loader={isLoading}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default ForgotPassword;
