import React, { useState, useRef } from 'react';
import moment from 'moment';
import { Formik, Form } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

import s from './VideoConsultationsList.module.scss';
import SearchIcon from '../../assets/icons/Search.svg';
import MobileSearchIcon from '../../assets/icons/MobileSearch.svg';
import { useHistory } from 'react-router';
import useDeviceSize from '../../hooks/useDeviceSize';
import { Loader } from '../../shared/Global/Loader/Loader';
import Divider from '../../components/Divider/Divider';
import DatePicker from 'react-datepicker';
import { MoreOptionsButton } from './MoreOptionsButton';
import Modal from '../../shared/Global/Modal/Modal';
import Confirm from '../../shared/Global/Modal/Confirm/Confirm';
import setDateTimeValidation from './setDateTimeValidation';
import Input, { InputTypes } from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Consultation as RequestedConsultation } from '../../@types/entities/Consultation';
import {
  useChangeConsultationDatetimeMutation,
  useDeleteConsultationMutation,
  useGetConsultationsQuery,
} from '../../api/consultations';

const VideoConsultationsList = () => {
  interface Consultation {
    id: number;
    date: string;
    time: string;
    clientName: string;
    status: string;
    fullData: RequestedConsultation;
  }

  const history = useHistory();

  const [searchInput, setSearchInput] = useState('');
  const [consultationToChange, setConsultationToChange] =
    useState<Consultation>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSetDateTimeModalVisible, setIsSetDateTimeModalVisible] =
    useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const deviseWidth = useDeviceSize().width;

  const [list, setList] = React.useState<Consultation[]>([]);

  const { data, refetch, isLoading } = useGetConsultationsQuery();
  const [
    requestDeleteConsultation,
    { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading },
  ] = useDeleteConsultationMutation();
  const [
    requestChangeConsultationDatetime,
    { isSuccess: isChangeSuccess, isLoading: isChangeLoading },
  ] = useChangeConsultationDatetimeMutation();

  React.useEffect(() => {
    refetch();
  }, [isChangeSuccess, isDeleteSuccess]);

  React.useEffect(() => {
    let consultations;

    if (data) {
      consultations = data.map((consultation: RequestedConsultation) => {
        const date = new Date(consultation.date);
        const dmy = moment(date).format('D MMMM YYYY');
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const name = consultation.user.name;
        const lastname = consultation.user.lastname;
        const patronymic = consultation.user.patronymic;
        const status =
          new Date().getTime() < date.getTime() ? 'active' : 'inactive';

        return {
          id: consultation.id,
          date: consultation.date ? dmy : '-',
          time: consultation.date
            ? `${hours < 10 ? '0' + hours : hours}:${
                minutes < 10 ? '0' + minutes : minutes
              }`
            : '-',
          clientName: `${name} ${lastname || ''} ${patronymic || ''}`,
          status,
          fullData: consultation,
        };
      });

      setList(consultations);
    }
  }, [data]);

  const handleChangeSearchInput = (
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    setSearchInput(event.currentTarget.value);
  };

  const handleSearchButtonClick = () => {
    searchInputRef && searchInputRef.current && searchInputRef.current.focus();
  };

  const filteredConsultationsList = list.filter(
    (consultation: Consultation) =>
      consultation.date.includes(searchInput) ||
      consultation.time.includes(searchInput) ||
      consultation.clientName.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const activeConsultationsList = filteredConsultationsList.filter(
    (consultation: Consultation) =>
      consultation.status === 'active' || consultation.date === '-',
  );

  const inactiveConsultationsList = filteredConsultationsList.filter(
    (consultation: Consultation) =>
      consultation.status === 'inactive' && consultation.date !== '-',
  );

  const showSetDateTimeModal = () => {
    setIsSetDateTimeModalVisible(true);
  };

  function goToConsultation(id: number) {
    return history.push('/consultations/' + id);
  }

  const closeSetDateTimeModal = () => {
    setIsSetDateTimeModalVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  interface InputTypes {
    date: Date;
    time: string;
  }

  const setDateTime = (
    consultationToChange: Consultation,
    values: InputTypes,
  ) => {
    const date = values.date;
    const time = values.time;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dayString = day < 10 ? '0' + day : day;
    const monthString = month < 10 ? '0' + month : month;

    requestChangeConsultationDatetime({
      ...consultationToChange.fullData,
      date: `${year}-${monthString}-${dayString}T${time}`,
    });

    closeSetDateTimeModal();
  };

  const deleteConsultation = (id: number) => {
    requestDeleteConsultation({ id });
    closeDeleteModal();
  };

  return (
    <>
      {(isLoading || isChangeLoading || isDeleteLoading) && <Loader />}
      <div className={s.usersList}>
        <div className={s.header}>
          <div className={s.headerLeft}>
            <h2 className={s.headerTitle}>Все видеоконсультации</h2>
            <span className={s.usersCount}>{list.length}</span>
          </div>
          <div className={s.headerRight}>
            <img src={SearchIcon} alt="" className={s.searchIcon} />
            <input
              type="text"
              placeholder="Поиск консультаций..."
              className={s.searchInput}
              ref={searchInputRef}
              value={searchInput}
              onChange={handleChangeSearchInput}
            />
            <button onClick={handleSearchButtonClick}>
              <img
                src={MobileSearchIcon}
                alt=""
                className={s.mobileSearchIcon}
              />
            </button>
          </div>
        </div>
        <table className={s.table}>
          <tr className={s.tableHeaderRow}>
            <th>Дата</th>
            <th>Время</th>
            <th>Клиент</th>
            <th></th>
          </tr>
          {activeConsultationsList.length !== 0 ? (
            activeConsultationsList.map((consultation: Consultation) => (
              <tr key={consultation.id} className={s.tableRow}>
                <td>{consultation.date}</td>
                <td>{consultation.time}</td>
                <td>{consultation.clientName}</td>
                <td>
                  <MoreOptionsButton
                    isMovable={!!consultation.fullData.meetingNumber}
                    consultationId={consultation.id}
                    showSetDateTimeModal={() => {
                      setConsultationToChange(consultation);
                      showSetDateTimeModal();
                    }}
                    showDeleteModal={() => {
                      setConsultationToChange(consultation);
                      showDeleteModal();
                    }}
                    goToConsultation={() => {
                      goToConsultation(consultation.id);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className={s.tableRow}>
              <td className={s.tableNoData}>Нет данных</td>
            </tr>
          )}
          <tr className={s.tableHeaderRow}>
            <th>Прошедшие</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          {inactiveConsultationsList.length !== 0 ? (
            inactiveConsultationsList.map((consultation: Consultation) => (
              <tr
                key={consultation.id}
                className={s.tableRowOfPastConsultations}
              >
                <td>{consultation.date}</td>
                <td>{consultation.time}</td>
                <td>{consultation.clientName}</td>
                <td>
                  <MoreOptionsButton
                    isMovable={!!consultation.fullData.meetingNumber}
                    consultationId={consultation.id}
                    showSetDateTimeModal={() => {
                      setConsultationToChange(consultation);
                      showSetDateTimeModal();
                    }}
                    showDeleteModal={() => {
                      setConsultationToChange(consultation);
                      showDeleteModal();
                    }}
                    goToConsultation={() => {
                      goToConsultation(consultation.id);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className={s.tableRow}>
              <td className={s.tableNoData}>Нет данных</td>
            </tr>
          )}
        </table>
      </div>
      <Modal isOpened={isDeleteModalVisible} close={() => closeDeleteModal()}>
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
      </Modal>
    </>
  );
};

export default VideoConsultationsList;
