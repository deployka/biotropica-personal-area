
import { Formik, FormikHelpers } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { store } from 'react-notifications-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GlobalSvgSelector } from '../../../../../assets/icons/global/GlobalSvgSelector';
import { notification } from '../../../../../config/notification/notificationForm';
import { useModal } from '../../../../../hooks/UseModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import classNames from 'classnames';
import FileService, { IFile } from '../../../../../services/FileService';
import { Button } from '../../../../../shared/Form/Button/Button';
import { Loader } from '../../../../../shared/Form/Loader/Loader';
import { PopupBackground } from '../../../../../shared/Global/PopupBackground/PopupBackground';
import {
  createProgressData,
  fetchProgressData,
  setProgressResponse,
} from '../../../../../store/ducks/progress/actionCreators';
import {
  CreateProgressData,
  TypePhoto,
} from '../../../../../store/ducks/progress/contracts/state';
import {
  selectProgressLoadingStatus,
  selectProgressResponse,
} from '../../../../../store/ducks/progress/selectors';
import { LoadingStatus } from '../../../../../store/types';
import s from './AddPhotoModal.module.scss';
import { validationSchema } from './validationSchema';
import { ErrorMessage } from '../../../../../shared/Form/ErrorMessage/ErrorMessage';
import { ProfileSvgSelector } from '../../../../../assets/icons/profile/ProfileSvgSelector';

interface PhotoInput {
  src: string;
}

type Inputs = {
  [key in TypePhoto]: PhotoInput;
};

type Files = {
  [key in TypePhoto]: File | null;
};

interface Props {}

export const AddPhotoModal = ({}: Props) => {
  const [inputs, setInputs] = useState<Inputs>({
    [TypePhoto.SIDE]: {
      src: '',
    },
    [TypePhoto.FRONT]: {
      src: '',
    },
    [TypePhoto.BACK]: {
      src: '',
    },
  });

  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectProgressLoadingStatus);
  const response = useSelector(selectProgressResponse);
  const refSetFieldValue = useRef<any>(null);
  const refResetForm = useRef<any>(null);

  const { closeModal, modals } = useModal();

  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (loadingStatus === LoadingStatus.LOADING) {
      setLoader(true);
    }
    if (loadingStatus === LoadingStatus.ERROR && refSetFieldValue.current) {
      store.addNotification({
        ...notification,

        title: 'Произошла ошибка!',
        message: response?.message || 'Произошла непредвиденная ошибка!',
        type: 'danger',
      });
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
        message: 'Фотографии успешно загружены!',
        type: 'success',
      });
      refResetForm.current();
      closeModal(ModalName.MODAL_ADD_PROGRESS_PHOTO);
      dispatch(fetchProgressData());
    }
    dispatch(setProgressResponse(undefined));
  }, [loadingStatus]);

  async function onSubmit(values: Files, options: FormikHelpers<Files>) {
    if (!values.BACK || !values.SIDE || !values.FRONT) {
      return;
    }
    refResetForm.current = options.resetForm;
    try {
      setLoader(true);
      const { data: files } = await FileService.uploadFiles([
        values.BACK,
        values.FRONT,
        values.SIDE,
      ]);

      const data: CreateProgressData = {
        photos: [
          {
            filename: files[0].name,
            type: TypePhoto.BACK,
          },
          {
            filename: files[1].name,
            type: TypePhoto.FRONT,
          },
          {
            filename: files[2].name,
            type: TypePhoto.SIDE,
          },
        ],
      };
      dispatch(createProgressData(data));
    } catch (error) {}
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  function loadFile(
    e: React.ChangeEvent<HTMLInputElement>,
    type: TypePhoto,
    setFieldValue: any
  ) {
    const tgt = e.target;
    const files = tgt.files;
    const permittedPaths = ['image/png', 'image/jpeg', 'image/gif'];
    if (
      FileReader &&
      files &&
      files.length &&
      permittedPaths.includes(files?.[0]?.type)
    ) {
      store.removeNotification('avatar_type_error');
      const fr = new FileReader();
      fr.onload = function () {
        setInputs({
          ...inputs,
          [type]: {
            src: fr.result,
          },
        });
        setFieldValue(type, files[0]);
      };
      fr.readAsDataURL(files[0]);
    } else {
      store.addNotification({
        ...notification,
        title: 'Фото профиля не обновлено!',
        message: 'Допустимые типы изображения: png, jpg, gif',
        type: 'danger',
        id: 'avatar_type_error',
        dismiss: {
          duration: 7000,
          onScreen: true,
        },
      });
    }
  }

  function getInputNameByType(type: TypePhoto): string {
    switch (type) {
      case TypePhoto.BACK:
        return 'Вид сзади';
      case TypePhoto.FRONT:
        return 'Вид спереди';
      case TypePhoto.SIDE:
        return 'Вид сбоку';
    }
  }

  return (
    <>
      <div onClick={() => closeModal(ModalName.MODAL_ADD_PROGRESS_PHOTO)}>
        <PopupBackground open={modals.MODAL_ADD_PROGRESS_PHOTO.open} />
      </div>
      <Formik
        initialValues={{
          [TypePhoto.BACK]: null,
          [TypePhoto.FRONT]: null,
          [TypePhoto.SIDE]: null,
        }}
        validateOnBlur
        onSubmit={(values: Files, options) => onSubmit(values, options)}
        validationSchema={validationSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          isValid,
          handleSubmit,
          setFieldValue,
          dirty,
        }) => (
          <div className={s.modal}>
            <div className={s.title}>
              <p>Добавление фото</p>
            </div>
            <div className={s.items}>
              {Object.keys(inputs).map((typeStr: string, i) => {
                const type = typeStr as TypePhoto;
                return (
                  <div key={type}>
                    <input
                      type="file"
                      className={s.input}
                      id={`pd_input-${i}`}
                      onBlur={handleBlur}
                      onChange={e => {
                        loadFile(e, type, setFieldValue);
                      }}
                    />
                    <label
                      className={classNames(s.label, {
                        [s.success__input]: touched[type] && !errors[type],
                        [s.error__input]: touched[type] && errors[type],
                      })}
                      style={
                        inputs[type] && {
                          backgroundImage: `url(${inputs[type].src})`,
                        }
                      }
                      htmlFor={`pd_input-${i}`}
                    >
                      {!inputs[type].src && (
                        <>
                          <ProfileSvgSelector id={'camera'} />
                          <p>{getInputNameByType(type)}</p>
                        </>
                      )}
                    </label>
                    <div className={s.error}>
                      <ErrorMessage message={errors[type] || ''} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={s.buttons}>
              <Button
                onClick={() => closeModal(ModalName.MODAL_ADD_PROGRESS_PHOTO)}
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
