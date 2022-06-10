import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { useModal } from '../../../../../hooks/useModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import classNames from 'classnames';
import { Button } from '../../../../../shared/Form/Button/Button';
import { Loader } from '../../../../../shared/Form/Loader/Loader';
import { PopupBackground } from '../../../../../shared/Global/PopupBackground/PopupBackground';

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

import s from './AddPhotoModal.module.scss';
import { ProgressPhotoType } from '../../../../../@types/entities/Progress';
import { Client } from '../../../../../@types/entities/Client';
import { useUploadFilesMutation } from '../../../../../api/files';
import { CreateProgressDto } from '../../../../../@types/dto/progress/create.dto';
import { useCreateProgressPostMutation } from '../../../../../api/progress';
import { BaseUser } from '../../../../../@types/entities/BaseUser';
import { ResponseError } from '../../../../../@types/api/response';
interface PhotoInput {
  src: string;
}

type Inputs = {
  [key in ProgressPhotoType]: PhotoInput;
};

type Files = {
  [key in ProgressPhotoType]: File | null;
};

interface Props {
  user: BaseUser;
}

export const AddPhotoModal = ({ user }: Props) => {
  const [inputs, setInputs] = useState<Inputs>({
    side: {
      src: '',
    },
    front: {
      src: '',
    },
    back: {
      src: '',
    },
  });

  const { closeModal, modals } = useModal();

  // useEffect(() => {
  //   switch (loadingStatus) {
  //     case LoadingStatus.ERROR:
  //       break;
  //     case LoadingStatus.SUCCESS:
  //       if (!refResetForm.current) return;
  //       eventBus.emit(EventTypes.notification, {
  //         title: 'Успешно!',
  //         message: 'Фотографии успешно загружены!',
  //         type: NotificationType.SUCCESS,
  //       });
  //       refResetForm.current();
  //       closeModal(ModalName.MODAL_ADD_PROGRESS_PHOTO);
  //       dispatch(fetchProgressData(user.id));
  //       break;
  //     default:
  //       break;
  //   }
  //   dispatch(setProgressResponse(undefined));
  // }, [loadingStatus]);

  const [fetchUploadFiles, { isLoading: isFilesLoading }] =
    useUploadFilesMutation();
  const [createProgress, { isLoading: isProgressLoading }] =
    useCreateProgressPostMutation();

  const isLoading = isFilesLoading || isProgressLoading;

  async function onSubmit(values: Files, options: FormikHelpers<Files>) {
    if (!values.back || !values.front || !values.side) {
      return;
    }
    try {
      const files = await fetchUploadFiles({
        files: [values.back, values.front, values.side],
      }).unwrap();

      const data: CreateProgressDto = {
        photos: [
          {
            filename: files[0].name,
            type: 'back',
          },
          {
            filename: files[1].name,
            type: 'front',
          },
          {
            filename: files[2].name,
            type: 'side',
          },
        ],
      };
      await createProgress(data).unwrap();
      eventBus.emit(EventTypes.notification, {
        title: 'Успешно!',
        message: 'Фотографии успешно загружены!',
        type: NotificationType.SUCCESS,
      });
      options.resetForm();
      closeModal(ModalName.MODAL_ADD_PROGRESS_PHOTO);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || isLoading;
  }

  async function loadFile(
    e: React.ChangeEvent<HTMLInputElement>,
    type: ProgressPhotoType,
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
        toastId: 'file_type_error',
        autoClose: 7000,
      });
    }
  }

  function getInputNameByType(type: ProgressPhotoType): string {
    switch (type) {
      case 'back':
        return 'Вид сзади';
      case 'front':
        return 'Вид спереди';
      case 'side':
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
          back: null,
          front: null,
          side: null,
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
                const type = typeStr as ProgressPhotoType;
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
                  content: isLoading ? <Loader /> : 'Сохранить',
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
