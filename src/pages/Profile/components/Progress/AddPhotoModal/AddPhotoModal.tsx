import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { notification } from '../../../../../config/notification/notificationForm';
import { useModal } from '../../../../../hooks/UseModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import { Button } from '../../../../../shared/Form/Button/Button';
import { Loader } from '../../../../../shared/Form/Loader/Loader';
import { PopupBackground } from '../../../../../shared/Global/PopupBackground/PopupBackground';
import {
  createProgressData,
  setProgressResponse,
} from '../../../../../store/ducks/progress/actionCreators';
import { CreateProgressData } from '../../../../../store/ducks/progress/contracts/state';
import {
  selectProgressData,
  selectProgressLoadingStatus,
  selectProgressResponse,
} from '../../../../../store/ducks/progress/selectors';
import { LoadingStatus } from '../../../../../store/types';
import s from './AddPhotoModal.module.scss';
import { validationSchema } from './validationSchema';

interface Props {}

export const AddPhotoModal = ({}: Props) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectProgressLoadingStatus);
  const response = useSelector(selectProgressResponse);
  const progress = useSelector(selectProgressData);
  const refSetFieldValue = useRef<any>(null);
  const refResetForm = useRef<any>(null);

  const { setOpenModals, openModals } = useModal();

  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (loadingStatus === LoadingStatus.ERROR && refSetFieldValue.current) {
      store.addNotification({
        ...notification,
        title: 'Произошла ошибка!',
        message: response?.message,
        type: 'danger',
      });
      refSetFieldValue.current('current_password', '');
    }
    if (
      loadingStatus === LoadingStatus.SUCCESS ||
      loadingStatus === LoadingStatus.ERROR
    ) {
      setLoader(false);
    }
    if (loadingStatus === LoadingStatus.SUCCESS && refResetForm.current) {
      store.addNotification({
        ...notification,
        title: 'Успешно!',
        message: response?.message,
        type: 'success',
      });
      refResetForm.current();
    }
    dispatch(setProgressResponse(undefined));
  }, [loadingStatus]);

  async function onSubmit(values: CreateProgressData, options: any) {
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
    try {
      dispatch(createProgressData(values));
    } catch (error) {}
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  return (
    <>
      <div
        onClick={() =>
          setOpenModals({
            [ModalName.MODAL_ADD_PROGRESS_PHOTO]: {
              open: false,
            },
          })
        }
      >
        <PopupBackground open={openModals.MODAL_ADD_PROGRESS_PHOTO.open} />
      </div>
      <Formik
        initialValues={{
          current_password: '',
          password: '',
          verification_password: '',
        }}
        validateOnBlur
        onSubmit={(values: CreateProgressData, options) =>
          onSubmit(values, options)
        }
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={s.pd__container}>
            <div className={s.pd__title}>
              <p>Добавление фото</p>
            </div>
            <div className={s.pd__items}>
              <button className={s.pd_card}>
                <p>Вид сбоку</p>
              </button>
              <button className={s.pd_card}>
                <p>Вид спереди</p>
              </button>
              <button className={s.pd_card}>
                <p>Вид сзади</p>
              </button>
            </div>
            <div className={s.pd__buttons}>
              <Button
                onClick={() =>
                  setOpenModals({
                    [ModalName.MODAL_ADD_PROGRESS_PHOTO]: {
                      open: false,
                    },
                  })
                }
                options={{
                  width: '90px',
                  height: '32px',
                  classes: { discard: true },
                  content: 'Отмена',
                }}
              />

              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  width: '109px',
                  height: '32px',
                  content: loader ? <Loader /> : 'Сохранить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                }}
              />
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
