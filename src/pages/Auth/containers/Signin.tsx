import React, { useEffect, useRef, useState } from 'react';
import { FormikHelpers } from 'formik';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../../config/notification/notificationForm';
import {
  fetchSignin,
  setUserResponse,
} from '../../../store/ducks/user/actionCreators';
import { SigninData } from '../../../store/ducks/user/contracts/state';

import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { SigninForm } from '../components/SigninForm/SigninForm';
import { validationSchema } from '../components/SigninForm/validationSchema';

const Signin = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const response = useSelector(selectUserResponse);

  const loader = loadingStatus === LoadingStatus.LOADING;
  const refSetFieldValue = useRef<any>(null);

  useEffect(() => {
    if (!refSetFieldValue.current) return;
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message: response?.message || 'Произошла непредвиденная ошибка!',
          type: 'danger',
        });
        refSetFieldValue.current('password', '');
        break;
      case LoadingStatus.SUCCESS:
        store.addNotification({
          ...notification,
          title: 'Успешно!',
          message: 'Вход выполнен!',
          type: 'success',
        });
        break;
      default:
        break;
    }
  }, [loadingStatus]);

  async function onSubmit(
    values: SigninData,
    options: FormikHelpers<SigninData>
  ) {
    refSetFieldValue.current = options.setFieldValue;
    try {
      dispatch(fetchSignin(values));
    } catch (error) {}
  }

  return (
    <div className="formContainer">
      <SigninForm
        onSubmit={onSubmit}
        loader={loader}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default Signin;
