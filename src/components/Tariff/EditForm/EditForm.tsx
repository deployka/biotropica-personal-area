import React, { useState } from 'react';
import { Formik } from 'formik';
import Input, { InputTypes } from '../../Input/Input';
import Button from '../../Button/Button';
import { Tariff } from '../../../@types/entities/Tariff';
import { CreateTariffDto } from '../../../@types/dto/tariffs/create.dto';
import { UpdateTariffDto } from '../../../@types/dto/tariffs/update.dto';
import validationSchema from './validationSchema';

import s from './EditForm.module.scss';

export type FormData = Omit<CreateTariffDto, 'includedFields'>;

type Props = {
  tariff: Tariff;
  onClose: () => void;
  onDelete: () => void;
  onSubmit: (data: UpdateTariffDto) => void;
};

export function TariffEditForm({ tariff, onClose, onDelete, onSubmit }: Props) {
  const [tariffFeatures, setTariffFeatures] = useState<string[]>(
    tariff?.includedFields || [],
  );

  const handleSubmit = (data: FormData) => {
    onSubmit({ ...data, includedFields: tariffFeatures, id: tariff.id });
  };

  const changeIncludedField = (value: string, i: number) => {
    const updatedFields = tariffFeatures.slice();
    updatedFields.splice(i, 1, value);

    setTariffFeatures(updatedFields);
  };

  const deleteIncludedField = (i: number) => {
    const updatedFields = tariffFeatures.slice();
    updatedFields.splice(i, 1);

    setTariffFeatures(updatedFields);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        cost: tariff.cost,
        description: tariff.description,
        title: tariff.title,
        zakazSystemId: tariff.zakazSystemId,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="cost"
            type={InputTypes.NUMBER}
            label="Цена"
            placeholder="Цена тарифа"
            suffix="₽"
            value={values.cost}
            onChange={handleChange}
            classes={s.input}
          />

          <Input
            name="zakazSystemId"
            type={InputTypes.TEXT}
            label="Id тарифа (zakazSystemId)"
            placeholder="zakazSystemId"
            value={values.zakazSystemId || ''}
            onChange={handleChange}
            classes={s.input}
          />

          <Input
            name="title"
            type={InputTypes.TEXT}
            label="Название"
            placeholder="Введите название тарифа"
            value={values.title}
            // isError={name.trim() === ''}
            onChange={handleChange}
            classes={s.input}
          />

          {tariffFeatures.map((feature, i) => (
            <Input
              key={i}
              name={`includedField/${i}`}
              type={InputTypes.TEXT}
              label={i === 0 ? 'что входит в план' : undefined}
              placeholder="Введите опцию"
              value={feature.toString()}
              isError={feature.trim() === ''}
              classes={s.input}
              onChange={e => changeIncludedField(e.currentTarget.value, i)}
              withCancel
              onCancel={() => deleteIncludedField(i)}
            />
          ))}

          <Button
            className={s.addFieldBtn}
            isDisabled={tariffFeatures.includes('')}
            isFunctional
            onClick={() => setTariffFeatures([...tariffFeatures, ''])}
          >
            Добавить поле
          </Button>

          <div className={s.closeAndSave}>
            <Button isFunctional onClick={onClose} className={s.closeBtn}>
              Отмена
            </Button>
            <Button isPrimary type="submit">
              Сохранить
            </Button>
          </div>

          <p className={s.deleteBtn} onClick={onDelete}>
            Удалить тариф
          </p>
        </form>
      )}
    </Formik>
  );
}
