import classNames from 'classnames';
import { Formik } from 'formik';
import React from 'react';
import Button from '../../Button/Button';
import { HtmlEditor } from '../../HtmlEditor/HtmlEditor';
import Input, { InputTypes } from '../../Input/Input';
import validationSchema from './validationSchema';
import s from './EditForm.module.scss';

export type RecommendationForm = {
  title: string;
  description: string;
};

export type Props = {
  defaultValues: RecommendationForm;
  onSave(data: RecommendationForm): void;
  onClose(): void;
};

export function RecommendationEditForm({
  defaultValues,
  onSave,
  onClose,
}: Props) {
  return (
    <Formik
      enableReinitialize
      initialValues={defaultValues}
      onSubmit={onSave}
      validationSchema={validationSchema}
    >
      {({ values, handleSubmit, handleBlur, handleChange, setFieldValue }) => (
        <form className={s.recommendationForm} onSubmit={e => handleSubmit(e)}>
          <div className={s.line}>
            <Input
              name="title"
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
  );
}
