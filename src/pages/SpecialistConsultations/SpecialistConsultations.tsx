import React, { useState, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router';
import useDeviceSize from '../../hooks/useDeviceSize';

import {
  useChangeConsultationDatetimeMutation,
  useDeleteConsultationMutation,
  useGetSpecialistConsultationsQuery,
} from '../../api/consultations';
import { useGetCurrentSpecialistQuery } from '../../api/specialists';
import {
  SpecialistConsultation,
  SpecialistConsultationsList,
} from '../../components/SpecialistConsultations/List/List';

import { formatConsultation } from './consultationsHelper';

const SpecialistConsultations = () => {
  const history = useHistory();

  const [searchInput, setSearchInput] = useState('');
  // const [consultationToChange, setConsultationToChange] =
  //   useState<Consultation>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSetDateTimeModalVisible, setIsSetDateTimeModalVisible] =
    useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const deviseWidth = useDeviceSize().width;

  // const [list, setList] = React.useState<Consultation[]>([]);
  const { data: specialist, isLoading: isSpecialistLoading } =
    useGetCurrentSpecialistQuery();

  const { data: consultations = [], isLoading: isConsultationsLoading } =
    useGetSpecialistConsultationsQuery(specialist?.id || -1, {
      skip: !specialist?.id,
    });
  const [deleteConsultation] = useDeleteConsultationMutation();
  const [changeConsultationDatetime] = useChangeConsultationDatetimeMutation();

  const handleChangeSearchInput = (
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    setSearchInput(event.currentTarget.value);
  };

  const handleSearchButtonClick = () => {
    searchInputRef && searchInputRef.current && searchInputRef.current.focus();
  };

  const formattedConsultationsList: SpecialistConsultation[] =
    consultations.map(consultation => formatConsultation(consultation));

  // const filteredConsultationsList = formattedConsultationsList.filter(
  //   consultation =>
  //     consultation.date.includes(searchInput) ||
  //     consultation.time.includes(searchInput) ||
  //     consultation.clientName.toLowerCase().includes(searchInput.toLowerCase()),
  // );

  const activeConsultationsList = formattedConsultationsList.filter(
    consultation => consultation.status === 'active',
  );

  const inactiveConsultationsList = formattedConsultationsList.filter(
    consultation => consultation.status === 'inactive',
  );

  const showSetDateTimeModal = () => {
    setIsSetDateTimeModalVisible(true);
  };

  const goToConsultation = (id: number) => {
    return history.push('/consultations/' + id);
  };

  const closeSetDateTimeModal = () => {
    setIsSetDateTimeModalVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  // interface InputTypes {
  //   date: Date;
  //   time: string;
  // }

  // const setDateTime = (
  //   consultationToChange: Consultation,
  //   values: InputTypes,
  // ) => {
  //   const date = values.date;
  //   const time = values.time;

  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();

  //   const dayString = day < 10 ? '0' + day : day;
  //   const monthString = month < 10 ? '0' + month : month;

  //   requestChangeConsultationDatetime({
  //     ...consultationToChange.fullData,
  //     date: `${year}-${monthString}-${dayString}T${time}`,
  //   });

  //   closeSetDateTimeModal();
  // };

  // const handleDeleteConsultation = (id: number) => {
  //   deleteConsultation({ id });
  //   closeDeleteModal();
  // };

  if (isConsultationsLoading || isSpecialistLoading) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <SpecialistConsultationsList
        activeConsultations={activeConsultationsList}
        inactiveConsultations={inactiveConsultationsList}
      />
      {/* <Modal isOpened={isDeleteModalVisible} close={() => closeDeleteModal()}>
        <Confirm
          helpMessage="Вы уверены, что хотите удалить консультацию?"
          accept={() => {
            !!consultationToChange &&
              deleteConsultation(consultationToChange.id);
          }}
          reject={() => closeDeleteModal()}
        />
      </Modal>
      <Modal
        className={deviseWidth <= 576 ? 'modal-mobile' : ''}
        isOpened={isSetDateTimeModalVisible}
        close={() => closeSetDateTimeModal()}
      >
        <div className={s.dateTimeModal}>
          <h1 className={s.dateTimeHeader}>Изменить дату и время</h1>
          <div className={s.dateTimeDivider}>
            <Divider />
          </div>
          <Formik
            initialValues={{
              date: consultationToChange
                ? consultationToChange.fullData.date
                  ? new Date(consultationToChange.fullData.date)
                  : new Date()
                : new Date(),
              time: consultationToChange
                ? consultationToChange.time !== '-'
                  ? consultationToChange.time
                  : ''
                : '',
            }}
            validateOnBlur
            validationSchema={setDateTimeValidation}
            onSubmit={(values: InputTypes) => {
              !!consultationToChange &&
                setDateTime(consultationToChange, values);
            }}
          >
            {({
              values,
              isValid,
              dirty,
              handleBlur,
              handleChange,
              setFieldValue,
            }) => (
              <Form>
                <div className={s.dateTimeInputs}>
                  <div className={s.wrapperInput}>
                    <DatePicker
                      name="date"
                      minDate={new Date()}
                      maxDate={new Date('01-01-2035')}
                      selected={values.date}
                      onBlur={handleBlur}
                      onChange={(date: Date) => setFieldValue('date', date)}
                      onSelect={(date: Date) => setFieldValue('date', date)}
                    />
                  </div>
                  <div className={s.wrapperInput}>
                    <Input
                      type={InputTypes.TEXT}
                      name="time"
                      placeholder={deviseWidth <= 768 ? '00:00' : 'Время'}
                      value={values.time}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={s.dateTimeControlBtns}>
                  <Button
                    className={s.cancelBtn}
                    onClick={() => closeSetDateTimeModal()}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    className={s.submitBtn}
                    isPrimary
                    isDisabled={!(isValid && dirty)}
                  >
                    Сохранить
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal> */}
    </>
  );
};

export default SpecialistConsultations;
