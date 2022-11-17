import React, { useState } from 'react';
import { Formik, FormikConfig, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { Button } from '../../../shared/Form/Button/Button';
import { Loader } from '../../../shared/Form/Loader/Loader';
import { ErrorMessage } from '../../../shared/Form/ErrorMessage/ErrorMessage';
import { ProfileSvgSelector } from '../../../assets/icons/profile/ProfileSvgSelector';
import {
  checkFileSize,
  checkFileType,
  FileType,
  uploadFiles,
} from '../../../utils/filesHelper';
import { validationSchema } from './validationSchema';
import { MAX_IMAGE_SIZE } from '../../../constants/files';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';

import { ProgressPhotoType } from '../../../@types/entities/Progress';
import { getInputNameByType } from '../progressTabHelper';
import Modal from '../../../shared/Global/Modal/Modal';

import s from './AddPhotoModal.module.scss';

// FIXME: почистить эти типы))
interface PhotoInput {
  src: string;
}

type Inputs = {
  [key in ProgressPhotoType]: PhotoInput;
};

export type Files = {
  [key in ProgressPhotoType]: File | null;
};

type Props = {
  isLoading?: boolean;
  isOpened: boolean;
  onSubmit: (values: Files, options: FormikHelpers<Files>) => void;
  onClose: () => void;
};

export const AddPhotoModal = ({
  isLoading,
  isOpened,
  onSubmit,
  onClose,
}: Props) => {
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

  const isDisabled = (isValid: boolean, dirty: boolean) => {
    return (!isValid && !dirty) || isLoading;
  };

  const handleClose = () => {
    onClose();
    setInputs({
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
  };

  async function loadFile(
    e: React.ChangeEvent<HTMLInputElement>,
    type: ProgressPhotoType,
    setFieldValue: (field: string, value: File) => void,
  ) {
    try {
      const files = e.target.files || null;
      const paths = [FileType.PNG, FileType.JPG, FileType.JPEG, FileType.GIF];

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
        message: `Допустимые типы: png, jpg/jpeg, gif
        Максимальный размер: ${MAX_IMAGE_SIZE} мб`,
        type: NotificationType.DANGER,
        toastId: 'file_type_error',
        autoClose: 7000,
      });
    }
  }

  return (
    <Modal isOpened={isOpened} close={onClose} className={s.modal}>
      <Formik
        initialValues={
          {
            back: null,
            front: null,
            side: null,
          } as Files
        }
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          dirty,
          errors,
          touched,
          isValid,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className={s.form}>
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
                      accept=".jpg, .jpeg, .png, .gif"
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
                onClick={handleClose}
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
                onClick={handleClose}
                options={{
                  width: '109px',
                  height: '32px',
                  content: isLoading ? <Loader /> : 'Сохранить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                }}
              />
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
