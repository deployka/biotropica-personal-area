import React from 'react';
import { FormikHelpers } from 'formik';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { EditPassword } from '../components/EditPassword/EditPassword';
import { useCurrentUserQuery } from '../../../api/user';
import { ChangePasswordDto } from '../../../@types/dto/auth/change-password.dto';
import {
  useChangePasswordMutation,
  useSignOutMutation,
} from '../../../api/auth';
import { ResponseError } from '../../../@types/api/response';

export const EditSecurityData = () => {
  const { data: user } = useCurrentUserQuery();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [signout] = useSignOutMutation();

  async function onSubmit(
    values: ChangePasswordDto,
    options: FormikHelpers<ChangePasswordDto>,
  ) {
    try {
      const res = await changePassword(values).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Пароль успешно изменен!',
        type: NotificationType.SUCCESS,
      });
      options.resetForm();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        message: (error as ResponseError)?.data.message,
        type: NotificationType.DANGER,
      });
      options.setFieldValue('currentPassword', '');
    }
  }

  return (
    <EditPassword
      onSubmit={onSubmit}
      logout={signout}
      loader={isLoading}
      user={user}
    />
  );
};
