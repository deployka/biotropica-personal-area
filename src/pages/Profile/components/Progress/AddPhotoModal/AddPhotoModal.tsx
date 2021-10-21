import { Formik } from 'formik';
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

enum InputType {
  FRONT = 'FRONT',
  BACK = 'BACK',
  SIDE = 'SIDE',
}

interface PhotoInput {
  src: string;
}

type Inputs = {
  [key in InputType]: PhotoInput;
};

type Files = {
  [key in InputType]: File | null;
};

interface Props {}

export const AddPhotoModal = ({}: Props) => {
  const [inputs, setInputs] = useState<Inputs>({
    [InputType.SIDE]: {
      src: '',
    },
    [InputType.FRONT]: {
      src: '',
    },
    [InputType.BACK]: {
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
        message: response?.message,
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
    }
    dispatch(setProgressResponse(undefined));
  }, [loadingStatus]);

  async function onSubmit(values: Files, options: any) {
    if (!values.BACK || !values.SIDE || !values.FRONT) {
      return;
    }
    refSetFieldValue.current = options.setFieldValue;
    refResetForm.current = options.resetForm;
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
    try {
      dispatch(createProgressData(data));
    } catch (error) {}
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  function loadFile(
    e: React.ChangeEvent<HTMLInputElement>,
    type: InputType,
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

  function getInputNameByType(type: InputType): string {
    switch (type) {
      case InputType.BACK:
        return 'Вид сзади';
      case InputType.FRONT:
        return 'Вид спереди';
      case InputType.SIDE:
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
          [InputType.BACK]: null,
          [InputType.FRONT]: null,
          [InputType.SIDE]: null,
        }}
        validateOnBlur
        onSubmit={(values: Files, options) => onSubmit(values, options)}
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
          setFieldValue,
          dirty,
        }) => (
          <div className={s.pd__container}>
            <div className={s.pd__title}>
              <p>Добавление фото</p>
            </div>
            <div className={s.pd__items}>
              {Object.keys(inputs).map((type: string, i) => (
                <div key={type}>
                  <input
                    type="file"
                    className={s.pd__input}
                    id={`pd_input-${i}`}
                    onBlur={handleBlur}
                    onChange={e => {
                      loadFile(e, type as InputType, setFieldValue);
                    }}
                  />
                  <label
                    className={classNames(s.pd__label, {
                      [s.success__input]:
                        touched[type as InputType] &&
                        !errors[type as InputType],
                      [s.error__input]:
                        touched[type as InputType] && errors[type as InputType],
                    })}
                    style={
                      inputs[type as InputType] && {
                        backgroundImage: `url(${
                          inputs[type as InputType].src
                        })`,
                      }
                    }
                    htmlFor={`pd_input-${i}`}
                  >
                    {!inputs[type as InputType].src && (
                      <>
                        <GlobalSvgSelector id="camera" />
                        <p>{getInputNameByType(type as InputType)}</p>
                      </>
                    )}
                  </label>
                  <ErrorMessage message={errors[type as InputType] || ''} />
                </div>
              ))}
            </div>

            <div className={s.pd__buttons}>
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
