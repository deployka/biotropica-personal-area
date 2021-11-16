import classNames from 'classnames';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ProfileSvgSelector } from '../../../../../assets/icons/profile/ProfileSvgSelector';
import { useModal } from '../../../../../hooks/useModal';
import { ModalName } from '../../../../../providers/ModalProvider';
import { Button } from '../../../../../shared/Form/Button/Button';
import { Loader } from '../../../../../shared/Form/Loader/Loader';
import { PopupBackground } from '../../../../../shared/Global/PopupBackground/PopupBackground';
import { CreateAnalyzeAnswerData } from '../../../../../store/ducks/analyze/contracts/state';

import { Input } from './../../../../../shared/Form/Input/Input';

import s from './AddAnalyzeModal.module.scss';

interface Props {
  onFileLoaded: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => File | null;
  onSubmit: (values: CreateAnalyzeAnswerData) => void;
  validationSchema: any;
}

export const AddAnalyzeModal = ({
  onFileLoaded,
  onSubmit,
  validationSchema,
}: Props) => {
  const { closeModal, modals } = useModal();
  const [loading, setLoading] = useState(false);
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loading;
  }

  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <div onClick={() => closeModal(ModalName.MODAL_ADD_ANALYZ_FILE)}>
        <PopupBackground open={modals.MODAL_ADD_ANALYZ_FILE.open} />
      </div>
      <Formik
        initialValues={{
          filePath: null,
          text: '',
          analyzeId: 1,
        }}
        validateOnBlur
        onSubmit={(values: CreateAnalyzeAnswerData) => {
          setLoading(true);
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
            onSubmit={e => e.preventDefault()}
            className={s.analyzeModal}
          >
            <div className={s.title}>
              <h2>Загрузить анализы</h2>
            </div>
            <div className={s.fileInput}>
              <input
                type="file"
                name="filePath"
                onChange={e => {
                  setFile(onFileLoaded(e, setFieldValue));
                }}
                id="modalFileInput"
              />
              <label
                className={classNames(s.label, {
                  [s.success__input]:
                    touched['filePath'] && !errors['filePath'],
                  [s.error__input]: touched['filePath'] && errors['filePath'],
                })}
                htmlFor="modalFileInput"
              >
                <ProfileSvgSelector id="document" />
                <p>{file ? file.name : 'Загрузить анализы'}</p>
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
                onClick={() => handleSubmit()}
                options={{
                  content: loading ? <Loader /> : 'Добавить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                }}
              />
              <Button
                onClick={() => closeModal(ModalName.MODAL_ADD_ANALYZ_FILE)}
                options={{
                  classes: { discard: true },
                  content: 'Отмена',
                }}
              />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
