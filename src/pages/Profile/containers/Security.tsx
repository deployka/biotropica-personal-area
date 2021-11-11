import { FormikHelpers } from 'formik';
import React, { useEffect, useRef } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../../config/notification/notificationForm';
import {
  fetchChangePassword,
  fetchSignout,
  setUserResponse,
} from '../../../store/ducks/user/actionCreators';
import { ChangePasswordData } from '../../../store/ducks/user/contracts/state';
import {
  selectUserData,
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { EditPassword } from '../components/EditPassword/EditPassword';

export const Security = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const response = useSelector(selectUserResponse);
  const user = useSelector(selectUserData);
  const refSetFieldValue = useRef<any>(null);
  const refResetForm = useRef<any>(null);
  const loader = loadingStatus === LoadingStatus.LOADING;

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        if (!refSetFieldValue.current) return;
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message: response?.message || 'Произошла непредвиденная ошибка!',
          type: 'danger',
        });
        refSetFieldValue.current('current_password', '');
        break;
      case LoadingStatus.SUCCESS:
        if (!refResetForm.current) return;
        store.addNotification({
          ...notification,
          title: 'Успешно!',
          message: response?.message,
          type: 'success',
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
    options: FormikHelpers<ChangePasswordData>
  ) {
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
    try {
      dispatch(fetchChangePassword(values));
    } catch (error) {}
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
