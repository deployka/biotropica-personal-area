import React, { useEffect, useRef } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import { useQuery } from '../../../hooks/useQuery';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { fetchRestorePassword } from '../../../store/ducks/user/actionCreators';
import { RestorePasswordData } from '../../../store/ducks/user/contracts/state';

import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { RestoreForm, Type } from '../components/RestoreForm/RestoreForm';
import { validationSchema } from '../components/RestoreForm/validationSchema';

const RestorePassword = () => {
  const dispatch = useDispatch();
  const response = useSelector(selectUserResponse);
  const history = useHistory();
  const query = useQuery();

  const loadingStatus = useSelector(selectUserLoadingStatus);
  const loader = loadingStatus === LoadingStatus.LOADING;

  const token = query.get('token') || '';
  const refSetFieldValue = useRef<((field: string, value: string) => void) | null>(
    null,
  );

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        if (!refSetFieldValue.current) return;
        refSetFieldValue.current('password', '');
        refSetFieldValue.current('verificationPassword', '');
        history.push('/signin');
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
    values: RestorePasswordData,
    options: FormikHelpers<RestorePasswordData>,
  ) {
    refSetFieldValue.current = options.setFieldValue;
    try {
      dispatch(fetchRestorePassword(values));
    } catch (error) {}
  }

  return (
    <div className="formContainer">
      <RestoreForm
        token={token}
        type={Type.CHANGE}
        onSubmit={onSubmit}
        loader={loader}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default RestorePassword;
