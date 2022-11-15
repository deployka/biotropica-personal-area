import React, { useState } from 'react';
import classNames from 'classnames';
import { Formik } from 'formik';
import type { CreateAnalyzeAnswerDto } from '../../../@types/dto/analyzes/create.dto';
import { MAX_PDF_SIZE } from '../../../constants/files';

import { Button } from '../../../shared/Form/Button/Button';
import { Loader } from '../../../shared/Form/Loader/Loader';
import {
  checkFileSize,
  checkFileType,
  FileType,
} from '../../../utils/filesHelper';
import { Input } from '../../../shared/Form/Input/Input';
import { ProfileSvgSelector } from '../../../assets/icons/profile/ProfileSvgSelector';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../GlobalNotifications/GlobalNotifications';
import Modal from '../../../shared/Global/Modal/Modal';

import { validationSchema } from './validationSchema';
import s from './AddModal.module.scss';

interface Props {
  onSubmit: (values: CreateAnalyzeAnswerDto) => void;
  isLoading: boolean;
  isOpened: boolean;
  onClose: () => void;
}

export const AnalyzesAddModal = ({
  onSubmit,
  isOpened,
  onClose,
  isLoading,
}: Props) => {
  const [fileName, setFileName] = useState('');

  async function onFileLoaded(
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) {
    try {
      const files = e.target.files || null;
      const paths = [FileType.PDF];

      if (!files) return;
      if (checkFileSize(files[0], MAX_PDF_SIZE)) throw new Error();
      if (!checkFileType(files[0], paths)) throw new Error();

      setFileName(files[0].name);
      setFieldValue('filePath', files[0]);
    } catch (error) {
      console.error(error);

      eventBus.emit(EventTypes.notification, {
        title: 'Файл не был загружен!',
        message: `Допустимые типы анализов:
         pdf Максимальный размер файла: ${MAX_PDF_SIZE} мб`,
        type: NotificationType.DANGER,
        toastId: 'file_type_error',
        autoClose: 7000,
      });
    }
  }

  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || isLoading;
  }

  const handleClose = () => {
    onClose();
    setFileName('');
  };

  return (
    <Modal isOpened={isOpened} className={s.modal} close={onClose}>
      <Formik
        initialValues={{
          filePath: null,
          text: '',
          analyzeId: 1,
        }}
        validateOnBlur
        onSubmit={(values: CreateAnalyzeAnswerDto) => {
          onSubmit(values);
        }}
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
          setFieldValue,
        }) => (
          <form
            name="add_analyze"
            onSubmit={handleSubmit}
            className={s.analyzeModal}
          >
            <div className={s.title}>
              <h2>Загрузить анализы</h2>
            </div>
            <div className={s.fileInput}>
              <input
                accept=".pdf"
                type="file"
                name="filePath"
                onChange={e => onFileLoaded(e, setFieldValue)}
                id="modalFileInput"
              />
              <label
                className={classNames(s.label, {
                  [s.success__input]: touched.filePath && !errors.filePath,
                  [s.error__input]: touched.filePath && errors.filePath,
                })}
                htmlFor="modalFileInput"
              >
                <ProfileSvgSelector id="document" />
                <p>{fileName || 'Загрузить анализы'}</p>
              </label>
            </div>
            <div className={s.textInput}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введите название"
                name="text"
                value={values.text}
                type="text"
                options={{ touched, errors }}
              />
            </div>

            <div className={s.buttons}>
              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={handleClose}
                options={{
                  content: isLoading ? <Loader /> : 'Добавить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                }}
              />
              <Button
                onClick={onClose}
                options={{
                  classes: { discard: true },
                  content: 'Отмена',
                }}
              />
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
