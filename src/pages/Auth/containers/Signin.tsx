import React, { useEffect, useRef } from 'react';
import { FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignin } from '../../../store/ducks/user/actionCreators';
import { SigninData } from '../../../store/ducks/user/contracts/state';

import { selectUserLoadingStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';
import { SigninForm } from '../components/SigninForm/SigninForm';
import { validationSchema } from '../components/SigninForm/validationSchema';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';

const Signin = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectUserLoadingStatus);

  const loader = loadingStatus === LoadingStatus.LOADING;
  type Current = ((field: string, value: string) => void) | null;
  const refSetFieldValue = useRef<Current>(null);

  useEffect(() => {
    if (!refSetFieldValue.current) return;
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        refSetFieldValue.current('password', '');
        eventBus.emit(EventTypes.notification, {
          message: 'Неверный логин или пароль!',
          type: NotificationType.DANGER,
        });
        break;
      case LoadingStatus.SUCCESS:
        eventBus.emit(EventTypes.notification, {
          message: 'Вход выполнен!',
          type: NotificationType.SUCCESS,
        });
        eventBus.emit(EventTypes.notification, {
          title: 'Внимание!',
          message:
            'Проводятся технические работы с системой оплаты тарифных планов. Вам доступны основные функции личного кабинета, кроме взаимодействия со специалистами Biotropika. Мы работаем над устранением проблемы',
          dismiss: undefined,
          type: NotificationType.INFO,
        });
        break;
      default:
        break;
    }
  }, [loadingStatus]);

  function onSubmit(values: SigninData, options: FormikHelpers<SigninData>) {
    refSetFieldValue.current = options.setFieldValue;
    dispatch(fetchSignin(values));
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
