import React, { RefObject } from 'react';

import { Formik, FormikProps } from 'formik';
import { TimePickerValue } from 'react-time-picker';
import Button from '../Button/Button';
import DatePickerCustom from '../DatePicker/DatePickerCustom';
import { HtmlEditor } from '../HtmlEditor/HtmlEditor';
import Input, { InputTypes } from '../Input/Input';
import SelectCustom from '../Select/SelectCustom';
import { TimePickerCustom } from '../TimePickerCustom/TimePickerCustom';

import s from './CompetitionTaskEditor.module.scss';

import {
  getCompetitionTypeOptions,
  getPlanValueMeasure,
  selectKindOfCompetitionSport,
  selectTaskPriority,
} from './CompetitionTaskEditorConstants';
import validationSchema from './validationSchema';
import {
  CompetitionTask,
  CreateCompetitionTask,
  CyclingCompetitionType,
  KindOfCompetitionSport,
  RunCompetitionType,
  SkisCompetitionType,
  SwimCompetitionType,
  TriathlonCompetitionType,
} from '../../store/@types/Task';
import { NEW_DATE } from '../../constants/dates';

export type CompetitionTaskEditorProps = {
  task: CompetitionTask | CreateCompetitionTask;
  isLoading: boolean;
  formikRef: RefObject<FormikProps<Partial<CreateCompetitionTask>>>;
  onSave(task: CreateCompetitionTask): void;
  onClose(): void;
};

export function CompetitionTaskEditor({
  task,
  isLoading,
  onSave,
  formikRef,
  onClose,
}: CompetitionTaskEditorProps) {
  function onSubmit(values: Partial<CreateCompetitionTask>) {
    onSave({ ...task, ...values });
  }

  function getPlanValuePlaceholder(
    kindOfSport: KindOfCompetitionSport | undefined,
    competitionType:
      | RunCompetitionType
      | SkisCompetitionType
      | TriathlonCompetitionType
      | SwimCompetitionType
      | CyclingCompetitionType
      | undefined,
  ) {
    return kindOfSport && competitionType
      ? getPlanValueMeasure(kindOfSport, competitionType)
      : 'Значение';
  }

  return (
    <Formik
      formikRef={formikRef}
      enableReinitialize
      initialValues={{
        title: task.title,
        kindOfSport: task.kindOfSport,
        competitionType: task.competitionType,
        priority: task.priority,
        date: task.date,
        startTime: task.startTime,
        targetValue: task.targetValue,
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
      }) => (
        <form className={s.form} onSubmit={handleSubmit}>
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
          <div className={s.line}>
            <SelectCustom
              name="kindOfSport"
              placeholder="Вид спорта"
              label="Вид спорта"
              value={values.kindOfSport}
              touched={!!touched.kindOfSport}
              error={errors.kindOfSport}
              options={selectKindOfCompetitionSport}
              onBlur={handleBlur}
              onChange={kindOfSport => {
                setFieldValue('competitionType', '');
                setFieldValue('kindOfSport', kindOfSport);
              }}
            />
          </div>
          {values.kindOfSport && (
            <div className={s.line}>
              <SelectCustom
                name="competitionType"
                placeholder="Тип соревнования"
                label="Тип соревнования"
                value={values.competitionType}
                error={errors.competitionType}
                touched={!!touched.competitionType}
                options={getCompetitionTypeOptions(
                  values.kindOfSport as KindOfCompetitionSport,
                )}
                onBlur={handleBlur}
                onChange={value => {
                  setFieldValue('competitionType', value);
                }}
              />
            </div>
          )}
          <div className={s.line}>
            <SelectCustom
              name="priority"
              placeholder="Приоритет"
              label="Приоритет"
              value={values.priority}
              touched={!!touched.priority}
              error={errors.priority}
              options={selectTaskPriority}
              onBlur={handleBlur}
              onChange={value => {
                setFieldValue('priority', value);
              }}
            />
          </div>
          <div className={s.line}>
            <DatePickerCustom
              name="date"
              minDate={NEW_DATE}
              selected={values.date ? new Date(values.date) : null}
              label={'Дата'}
              onBlur={handleBlur}
              onChange={(date: Date) => setFieldValue('date', date)}
              onSelect={(date: Date) => setFieldValue('date', date)}
            />
          </div>
          <div className={s.line}>
            <TimePickerCustom
              name="startTime"
              label="Время"
              value={values.startTime}
              touched={!!touched.startTime}
              error={errors.startTime}
              onChange={(value: TimePickerValue) => {
                setFieldValue('startTime', value as string);
              }}
            />
          </div>
          <div className={s.line}>
            <Input
              type={InputTypes.TEXT}
              placeholder={getPlanValuePlaceholder(
                values.kindOfSport,
                values.competitionType,
              )}
              label="Плановое значение"
              name="targetValue"
              value={values.targetValue}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className={s.line}>
            <HtmlEditor
              value={values.description || ''}
              config={{ formats: [''] }}
              onChange={value => {
                handleChange(value);
                setFieldValue('description', value);
              }}
            />
          </div>
          <div className={s.buttons}>
            <Button onClick={onClose}>Отмена</Button>
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              type="submit"
              isPrimary={true}
            >
              Сохранить
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
