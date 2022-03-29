import classNames from 'classnames';
import { Formik } from 'formik';
import React  from 'react';
import Button from '../../Button/Button';
import { HtmlEditor } from '../../HtmlEditor/HtmlEditor';
import Input, { InputTypes } from '../../Input/Input';
import s from './RecommendationEditor.module.scss';
import validationSchema from './validationSchema';

export type RecommendationEditorProps = {
  title: string;
  description: string;
  onSave(value: { title: string; description: string }): void;
  onClose(): void;
};

export function RecommendationEditor({
  title,
  description,
  onSave,
  onClose,
}: RecommendationEditorProps) {
  return (
    <>
      <div
        className={classNames(s.popupBg)}
        onClick={onClose}
      ></div>
      <div
        className={classNames(s.recommendationEditor)}
      >
        <Formik
          enableReinitialize
          initialValues={{ title: title, description: description }}
          onSubmit={onSave}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
          }) => (
            <form
              className={s.recommendationForm}
              onSubmit={e => handleSubmit(e)}
            >
              <div className={s.line}>
                <Input
                  name={'title'}
                  type={InputTypes.TEXT}
                  label="Название"
                  placeholder="Введите название"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className={s.line}>
                <div className={s.title}>Описание</div>
                <HtmlEditor
                  value={values.description}
                  onChange={value => {
                    handleChange(value);
                    setFieldValue('description', value);
                  }}
                  config={{
                    formats: [],
                  }}
                />
              </div>
              <div className={s.buttons}>
                <Button onClick={onClose}>Отмена</Button>
                <Button type="submit" isPrimary={true}>
                  Сохранить
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
