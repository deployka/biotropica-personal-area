import { FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notification } from '../../../config/notification/notificationForm';
import { useQuery } from '../../../hooks/useQuery';
import { fetchForgotPassword } from '../../../store/ducks/user/actionCreators';
import { ForgotPasswordData } from '../../../store/ducks/user/contracts/state';

import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { ForgotForm } from '../components/ForgotForm/ForgotForm';
import { validationSchema } from '../components/ForgotForm/validationSchema';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const response = useSelector(selectUserResponse);
  const query = useQuery();
  const history = useHistory();

  const loadingStatus = useSelector(selectUserLoadingStatus);
  const email = query.get('email') || '';

  const loader = loadingStatus === LoadingStatus.LOADING;
  const refSetFieldValue = useRef<any>(null);

  useEffect(() => {
    if (!refSetFieldValue.current) return;
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        refSetFieldValue.current('email', '');
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message: response?.message || 'Произошла непредвиденная ошибка!',
          type: 'danger',
        });
        break;
      case LoadingStatus.SUCCESS:
        store.addNotification({
          ...notification,
          title: 'Успешно!',
          message: response?.message || 'Успешно!',
          type: 'success',
        });
        history.push('/signin');
        break;
      default:
        break;
    }
  }, [loadingStatus]);

  async function onSubmit(
    values: ForgotPasswordData,
    options: FormikHelpers<ForgotPasswordData>
  ) {
    refSetFieldValue.current = options.setFieldValue;
    try {
      dispatch(fetchForgotPassword(values));
    } catch (error) {}
  }
  return (
    <div className="formContainer">
      <ForgotForm
        onSubmit={onSubmit}
        email={email}
        loader={loader}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default ForgotPassword;
