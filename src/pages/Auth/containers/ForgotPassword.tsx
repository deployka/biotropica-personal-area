import { FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { notification } from '../../../config/notification/notificationForm';
import { useQuery } from '../../../hooks/useQuery';
import { eventBus, EventTypes } from '../../../services/EventBus';
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
        break;
      case LoadingStatus.SUCCESS:
        eventBus.emit(EventTypes.notification, {
          title: 'Успешно!',
          message: response?.message || 'Успешно!',
          type: NotificationType.SUCCESS,
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
    dispatch(fetchForgotPassword(values));
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
