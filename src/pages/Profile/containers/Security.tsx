import React, { useEffect, useRef } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { eventBus, EventTypes } from '../../../services/EventBus';
import {
  fetchChangePassword,
  fetchSignout,
  setUserResponse,
} from '../../../store/ducks/user/actionCreators';
import { ChangePasswordData } from '../../../store/ducks/user/contracts/state';
import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { EditPassword } from '../components/EditPassword/EditPassword';
import { useRequestUserDataQuery } from '../../../store/rtk/requests/user';

export const Security = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const response = useSelector(selectUserResponse);
  const { data: user } = useRequestUserDataQuery();
  type SetFieldValue = (field: string, value: string) => void;
  const refSetFieldValue = useRef<SetFieldValue | null>(null);
  const refResetForm = useRef<(() => void) | null>(null);
  const loader = loadingStatus === LoadingStatus.LOADING;

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        if (!refSetFieldValue.current) return;
        refSetFieldValue.current('currentPassword', '');
        break;
      case LoadingStatus.SUCCESS:
        if (!refResetForm.current) return;
        eventBus.emit(EventTypes.notification, {
          title: 'Успешно!',
          message: response?.message,
          type: NotificationType.SUCCESS,
        });
        refResetForm.current();
        break;
      default:
        break;
    }
    dispatch(setUserResponse(undefined));
  }, [loadingStatus]);

  async function onSubmit(
    values: ChangePasswordData,
    options: FormikHelpers<ChangePasswordData>,
  ) {
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
    dispatch(fetchChangePassword(values));
  }

  async function logout() {
    dispatch(fetchSignout());
  }
  return (
    <EditPassword
      onSubmit={onSubmit}
      logout={logout}
      loader={loader}
      user={user}
    />
  );
};
