import { FormikHelpers } from 'formik';
import React, { useEffect, useRef } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notification } from '../../../config/notification/notificationForm';
import {
  fetchSignup,
  setUserResponse,
} from '../../../store/ducks/user/actionCreators';
import { SignupData } from '../../../store/ducks/user/contracts/state';

import {
  selectUserLoadingStatus,
  selectUserResponse,
} from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { validationSchema } from '../components/SignupForm/validationSchema';
import { SignupForm } from '../components/SignupForm/SignupForm';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const res = useSelector(selectUserResponse);
  const loadingStatus = useSelector(selectUserLoadingStatus);

  const [errorValue, errorText] = res?.message?.split(':') || [];

  const loader = LoadingStatus.LOADING === loadingStatus;
  const refSetFieldValue = useRef<any>(null);
  const refResetForm = useRef<any>(null);

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        if (!refSetFieldValue.current) return;
        store.addNotification({
          ...notification,
          title: 'Произошла ошибка!',
          message:
            errorText || res?.message || 'Произошла непредвиденная ошибка',
          type: 'danger',
        });
        errorValue && refSetFieldValue.current(errorValue, '');
        break;
      case LoadingStatus.SUCCESS:
        if (!refResetForm.current) return;
        store.addNotification({
          ...notification,
          title: `Успешно!`,
          message: res.message,
          type: 'success',
          dismiss: {
            onScreen: true,
            duration: 7000,
            pauseOnHover: true,
          },
        });
        dispatch(setUserResponse(undefined));
        refResetForm.current();
        history.push('/signin');
        break;
      default:
        break;
    }
  }, [loadingStatus]);

  async function onSubmit(
    values: SignupData,
    options: FormikHelpers<SignupData>
  ) {
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
    try {
      dispatch(fetchSignup(values));
    } catch (error) {}
  }
  return (
    <div className="formContainer">
      <SignupForm
        onSubmit={onSubmit}
        loader={loader}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default Signup;
