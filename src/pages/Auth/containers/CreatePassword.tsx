import React from 'react';
import { FormikHelpers } from 'formik';
import { useHistory } from 'react-router';
import { useQuery } from '../../../hooks/useQuery';
import { eventBus, EventTypes } from '../../../services/EventBus';

import { RestoreForm, Type } from '../components/RestoreForm/RestoreForm';
import { validationSchema } from '../components/RestoreForm/validationSchema';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { RestorePasswordDto } from '../../../@types/dto/auth/restore-password.dto';
import { useCreatePasswordMutation } from '../../../api/auth';
import { ResponseError } from '../../../@types/api/response';

const CreatePassword = () => {
  const history = useHistory();
  const query = useQuery();

  const token = query.get('token') || '';

  const [createPassword, { isLoading }] = useCreatePasswordMutation();

  async function onSubmit(
    values: RestorePasswordDto,
    options: FormikHelpers<RestorePasswordDto>,
  ) {
    try {
      await createPassword(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Пароль успешно создан!',
        type: NotificationType.SUCCESS,
      });
      history.push('/signin');
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
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
        type={Type.CREATE}
        onSubmit={onSubmit}
        loader={isLoading}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default CreatePassword;
