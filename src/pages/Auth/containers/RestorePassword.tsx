import React from 'react';
import { FormikHelpers } from 'formik';
import { useHistory } from 'react-router';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { useQuery } from '../../../hooks/useQuery';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { RestoreForm, Type } from '../components/RestoreForm/RestoreForm';
import { useRestorePasswordMutation } from '../../../api/auth';
import { RestorePasswordDto } from '../../../@types/dto/auth/restore-password.dto';
import { validationSchema } from '../components/RestoreForm/validationSchema';

const RestorePassword = () => {
  const history = useHistory();
  const query = useQuery();
  const token = query.get('token') || '';

  const [restorePassword, { isLoading }] = useRestorePasswordMutation();

  async function onSubmit(
    values: RestorePasswordDto,
    options: FormikHelpers<RestorePasswordDto>,
  ) {
    try {
      const res = await restorePassword(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        title: 'Успешно!',
        message: res?.message || 'Успешно!',
        type: NotificationType.SUCCESS,
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
      <RestoreForm
        token={token}
        type={Type.CHANGE}
        onSubmit={onSubmit}
        loader={isLoading}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default RestorePassword;
