import React, { useEffect, useRef, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../../../hooks/UseModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import classNames from 'classnames';
import FileService from '../../../../../services/FileService';
import { Button } from '../../../../../shared/Form/Button/Button';
import { Loader } from '../../../../../shared/Form/Loader/Loader';
import { PopupBackground } from '../../../../../shared/Global/PopupBackground/PopupBackground';
import {
  createProgressData,
  fetchProgressData,
  setProgressLoadingStatus,
  setProgressResponse,
} from '../../../../../store/ducks/progress/actionCreators';
import {
  CreateProgressData,
  TypePhoto,
} from '../../../../../store/ducks/progress/contracts/state';
import { selectProgressLoadingStatus } from '../../../../../store/ducks/progress/selectors';
import { LoadingStatus } from '../../../../../store/types';
import s from './AddPhotoModal.module.scss';
import { validationSchema } from './validationSchema';
import { ErrorMessage } from '../../../../../shared/Form/ErrorMessage/ErrorMessage';
import { ProfileSvgSelector } from '../../../../../assets/icons/profile/ProfileSvgSelector';
import {
  checkFileSize,
  checkFileType,
  FileType,
  uploadFiles,
} from '../../../../../utils/filesHelper';
import { MAX_IMAGE_SIZE } from '../../../../../constants/files';
import { eventBus, EventTypes } from '../../../../../services/EventBus';
import { NotificationType } from '../../../../../components/GlobalNotifications/GlobalNotifications';

interface PhotoInput {
  src: string;
}

type Inputs = {
  [key in TypePhoto]: PhotoInput;
};

type Files = {
  [key in TypePhoto]: File | null;
};

interface Props {
  user: User;
}

export const AddPhotoModal = ({ user }: Props) => {
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
  const refResetForm = useRef<(() => void) | null>(null);

  const { closeModal, modals } = useModal();
  const loader = loadingStatus === LoadingStatus.LOADING;

  useEffect(() => {
    switch (loadingStatus) {
      case LoadingStatus.ERROR:
        break;
      case LoadingStatus.SUCCESS:
        if (!refResetForm.current) return;
        eventBus.emit(EventTypes.notification, {
          title: 'Успешно!',
          message: 'Фотографии успешно загружены!',
          type: NotificationType.SUCCESS,
        });
        refResetForm.current();
        closeModal(ModalName.MODAL_ADD_PROGRESS_PHOTO);
        dispatch(fetchProgressData(user.id));
        break;
      default:
        break;
    }
    dispatch(setProgressResponse(undefined));
  }, [loadingStatus]);

  async function onSubmit(values: Files, options: FormikHelpers<Files>) {
    if (!values.BACK || !values.SIDE || !values.FRONT) {
      return;
    }
    refResetForm.current = options.resetForm;
    try {
      dispatch(setProgressLoadingStatus(LoadingStatus.LOADING));
      const { data: files } = await FileService.uploadFiles([
        values.BACK,
        values.FRONT,
        values.SIDE,
      ]);
      dispatch(setProgressLoadingStatus(LoadingStatus.LOADED));
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

  async function loadFile(
    e: React.ChangeEvent<HTMLInputElement>,
    type: TypePhoto,
    setFieldValue: (field: string, value: File) => void,
  ) {
    try {
      const files = e.target.files || null;
      const paths = [FileType.PNG, FileType.JPEG, FileType.GIF];

      if (!files) return;
      if (checkFileSize(files[0], MAX_IMAGE_SIZE)) throw new Error();
      if (!checkFileType(files[0], paths)) throw new Error();

      const fr = await uploadFiles(files);
      setInputs({
        ...inputs,
        [type]: {
          src: fr.result,
        },
      });
      setFieldValue(type, files[0]);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Фото не добавлено!',
        message: `Допустимые типы: png, jpg, gif
        Максимальный размер: ${MAX_IMAGE_SIZE} мб`,
        type: NotificationType.DANGER,
        id: 'file_type_error',
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
                      accept=".jpeg, .png, .gif"
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
