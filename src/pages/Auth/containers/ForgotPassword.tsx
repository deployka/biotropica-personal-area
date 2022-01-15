import React, { useEffect, useRef } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
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
  const refSetFieldValue = useRef<((field: string, value: string) => void) | null>(
    null
  );

  useEffect(() => {
    if (!refSetFieldValue.current) return;
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        refSetFieldValue.current('email', '');
        eventBus.emit(EventTypes.notification, {
          message: response?.message,
          type: NotificationType.DANGER,
        });
        break;
      case LoadingStatus.SUCCESS:
        eventBus.emit(EventTypes.notification, {
          message: response?.message,
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
