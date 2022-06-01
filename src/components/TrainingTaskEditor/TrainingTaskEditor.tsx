import React, { RefObject } from 'react';
import { Formik } from 'formik';
import Input, { InputTypes } from '../Input/Input';
import SelectCustom from '../Select/SelectCustom';
import validationSchema from './validationSchema';
import DatePickerCustom from '../DatePicker/DatePickerCustom';
import Button from '../Button/Button';
import { TimePickerCustom } from '../TimePickerCustom/TimePickerCustom';
import { HtmlEditor } from '../HtmlEditor/HtmlEditor';
import {
  firstTargetTypeOptions,
  kindOfSportOptions,
  secondTargetTypeOptions,
  trainingCategoryOptions,
} from './TraningTaskEditorConstants';

import s from './TrainingTaskEditor.module.scss';
import { TimePickerValue } from 'react-time-picker';
import { CreateTrainingTask, TrainingTask } from '../../store/@types/Task';
import { NEW_DATE } from '../../constants/dates';

export type TrainingTaskEditorProps = {
  onClose(): void;
  isLoading: boolean;
  task: TrainingTask | CreateTrainingTask;
  onSave(task: CreateTrainingTask): void;
  onSaveAsTemplate(task: Partial<CreateTrainingTask>): void;
};

export function TrainingTaskEditor({
  task,
  onClose,
  onSave,
  onSaveAsTemplate,
  isLoading,
}: TrainingTaskEditorProps) {
  function onSubmit(values: Partial<CreateTrainingTask>) {
    onSave({ ...task, ...values });
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: task.title,
        kindOfSport: task.kindOfSport,
        category: task.category,
        date: task.date,
        startTime: task.startTime,
        firstTargetType: task.firstTargetType,
        firstTargetValue: task.firstTargetValue,
        secondTargetType: task.secondTargetType,
        secondTargetValue: task.secondTargetValue,
        description: task.description,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <form id="task-form" className={s.form} onSubmit={handleSubmit}>
            <div className={s.line}>
              <Input
                type={InputTypes.TEXT}
                placeholder="Название"
                label="Название"
                name="title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <SelectCustom
                name="kindOfSport"
                placeholder="Вид спорта"
                label="Вид спорта"
                value={values.kindOfSport}
                touched={!!touched.kindOfSport}
                error={errors.kindOfSport as string}
                options={kindOfSportOptions}
                onBlur={handleBlur}
                onChange={value => {
                  setFieldValue('kindOfSport', value);
                }}
              />
            </div>
            <div>
              <SelectCustom
                name="category"
                placeholder="Категория"
                label="Категория"
                value={values.category}
                touched={!!touched.category}
                error={errors.category as string}
                options={trainingCategoryOptions}
                onBlur={handleBlur}
                onChange={value => {
                  setFieldValue('category', value);
                }}
              />
            </div>
            <div>
              <DatePickerCustom
                name="date"
                minDate={NEW_DATE}
                selected={values.date ? new Date(values.date as string) : null}
                label={'Дата'}
                onBlur={handleBlur}
                onChange={(date: Date) => setFieldValue('date', date)}
                onSelect={(date: Date) => setFieldValue('date', date)}
              />
            </div>
            <div>
              <TimePickerCustom
                name="startTime"
                value={values.startTime}
                label="Время"
                touched={!!touched.startTime}
                error={errors.startTime as string}
                onChange={(value: TimePickerValue) => {
                  setFieldValue('startTime', value as string);
                }}
              />
            </div>
            <div className={s.line}>
              <div className={s.half}>
                <SelectCustom
                  name="firstTargetType"
                  placeholder="Тип"
                  label="Плановое значение №1"
                  value={values.firstTargetType}
                  touched={!!touched.firstTargetType}
                  error={errors.firstTargetType as string}
                  options={firstTargetTypeOptions}
                  onBlur={handleBlur}
                  onChange={value => {
                    setFieldValue('firstTargetType', value);
                  }}
                />
              </div>
              <div className={`${s.half} ${s.secondValue}`}>
                <Input
                  type={InputTypes.NAME}
                  placeholder="Значение"
                  name="firstTargetValue"
                  value={values.firstTargetValue}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={s.line}>
              <div className={s.half}>
                <SelectCustom
                  name="secondTargetType"
                  placeholder="Тип"
                  label="Плановое значение №2"
                  value={values.secondTargetType}
                  touched={!!touched.secondTargetType}
                  error={errors.secondTargetType as string}
                  options={secondTargetTypeOptions}
                  onBlur={handleBlur}
                  onChange={value => {
                    setFieldValue('secondTargetType', value);
                  }}
                />
              </div>
              <div className={`${s.half} ${s.secondValue}`}>
                <Input
                  type={InputTypes.NAME}
                  placeholder="Значение"
                  name="secondTargetValue"
                  value={values.secondTargetValue}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="line">
              <HtmlEditor
                value={values.description || ''}
                config={{ formats: [] }}
                onChange={value => {
                  handleChange(value);
                  setFieldValue('description', value);
                }}
              />
            </div>
            <div className={s.buttons}>
              <Button onClick={onClose}>Отмена</Button>
              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                type="submit"
                isPrimary={true}
              >
                Сохранить
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
