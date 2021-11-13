import { FormikHelpers } from 'formik';
import React, { useEffect, useRef } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notification } from '../../../config/notification/notificationForm';
import { useQuery } from '../../../hooks/useQuery';
import { fetchCreatePassword } from '../../../store/ducks/user/actionCreators';
import { RestorePasswordData } from '../../../store/ducks/user/contracts/state';

import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { RestoreForm, Type } from '../components/RestoreForm/RestoreForm';
import { validationSchema } from '../components/RestoreForm/validationSchema';

const CreatePassword = () => {
  const dispatch = useDispatch();
  const response = useSelector(selectUserResponse);
  const history = useHistory();
  const query = useQuery();

  const loadingStatus = useSelector(selectUserLoadingStatus);
  const loader = loadingStatus === LoadingStatus.LOADING;

  const token = query.get('token') || '';
  const refResetForm = useRef<any>(null);

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        if (!refResetForm.current) return;
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message: response?.message || 'Произошла непредвиденная ошибка!',
          type: 'danger',
        });
        refResetForm.current();
        history.push('/signin');
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
    values: RestorePasswordData,
    options: FormikHelpers<RestorePasswordData>
  ) {
    refResetForm.current = options.resetForm;
    try {
      dispatch(fetchCreatePassword(values));
    } catch (error) {}
  }

  return (
    <div className="formContainer">
      <RestoreForm
        token={token}
        type={Type.CREATE}
        onSubmit={onSubmit}
        loader={loader}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default CreatePassword;
