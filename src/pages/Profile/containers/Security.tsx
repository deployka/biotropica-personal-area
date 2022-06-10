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

export const Security = () => {
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
        title: 'Успешно!',
        message: res?.message,
        type: NotificationType.SUCCESS,
      });
      options.resetForm();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as { message: string })?.message,
        type: NotificationType.SUCCESS,
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
