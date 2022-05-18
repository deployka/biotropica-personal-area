import { FormikHelpers } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
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
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const res = useSelector(selectUserResponse);
  const loadingStatus = useSelector(selectUserLoadingStatus);
  // TODO: реализовать функционал удаления поля при ошибке email || phone
  // const [errorValue, errorText] = res?.message?.split(':') || [];

  const loader = LoadingStatus.LOADING === loadingStatus;
  type SetFieldValue = (field: string, value: string) => void;
  const refSetFieldValue = useRef<SetFieldValue | null>(null);
  const refResetForm = useRef<(() => void) | null>(null);
  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        // if (!refSetFieldValue.current) return;

        // refSetFieldValue.current(errorValue, '');
        console.log(res);

        // refSetFieldValue.current('verificationPassword', '');
        break;
      case LoadingStatus.SUCCESS:
        if (!refResetForm.current) return;
        eventBus.emit(EventTypes.notification, {
          message: res?.message,
          type: NotificationType.SUCCESS,
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
  }, [dispatch, res, history, loadingStatus]);

  async function onSubmit(
    values: SignupData,
    options: FormikHelpers<SignupData>,
  ) {
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
    dispatch(fetchSignup(values));
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
