import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Consultation } from '../../../store/ducks/consultation/contracts/state';
import { fetchConsultationsData } from '../../../store/ducks/consultations/actionCreators';
import { selectConsultationsData } from '../../../store/ducks/consultations/selectors';
import { fetchSpecialistsData } from '../../../store/ducks/specialists/actionCreators';
import { selectFilteredSpecialistsData } from '../../../store/ducks/specialists/selectors';
import { chatApi } from '../../../shared/Global/Chat/services/chatApi';
import { eventBus, EventTypes } from '../../../services/EventBus';
import { differenceInDays } from 'date-fns';

import s from './Consultations.module.scss';

export const ConsultationsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchConsultationsData());
    dispatch(fetchSpecialistsData());
  }, [dispatch]);

  const specialists = useSelector(selectFilteredSpecialistsData);
  const consultations = useSelector(selectConsultationsData);

  const activeConsultations = consultations.filter(
    c => differenceInDays(new Date().getTime(), new Date(c.date || '')) <= 0,
  );
  const inactiveConsultations = consultations.filter(
    c => differenceInDays(new Date().getTime(), new Date(c.date || '')) > 0,
  );
  const consultationsWithoutData = consultations.filter(c => !c.date);

  const moveToConsultation = (id: number) => () => {
    history.push(`/consultations/list/${id}`);
  };

  async function sendMessage(userId: number) {
    const dialog = await chatApi.create(userId);
    eventBus.emit(EventTypes.chatOpen, dialog.id);
  }

  function onSendMessageClick(userId: number | undefined) {
    return () => {
      if (userId) {
        sendMessage(userId);
      } else {
        throw Error();
      }
    };
  }

  return (
    <div className={s.usersList}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <h2 className={s.headerTitle}>Мои видеоконсультации</h2>
          <span className={s.usersCount}>{activeConsultations.length}</span>
        </div>
        <div className={s.headerRight}></div>
      </div>
      <table className={s.table}>
        <tr className={s.tableHeaderRow}>
          <th>Дата</th>
          <th>Время</th>
          <th>Специалист</th>
          <th></th>
        </tr>
        {activeConsultations.length !== 0
          ? (
            activeConsultations.map((consultation: Consultation) => (
              <tr key={consultation.id} className={s.tableRow}>
                <td>{moment(consultation.date).format('LL')}</td>
                <td>{moment(consultation.date).format('LT')}</td>
                <td>
                  {
                    specialists.find(s => s.id === consultation.specialistId)
                      ?.name
                  }
                </td>
                <td
                  style={{
                    cursor: 'pointer',
                    color: '#6f61d0',
                    textAlign: 'right',
                  }}
                  onClick={moveToConsultation(consultation.id)}
                >
                перейти
                </td>
              </tr>
            ))
          )
          : (
            <tr className={s.tableRow}>
              <td className={s.tableNoData}>Нет данных</td>
            </tr>
          )}
        <tr className={s.tableHeaderRow}>
          <th>Без даты</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        {consultationsWithoutData.length !== 0
          ? (
            consultationsWithoutData.map((consultation: Consultation) => (
              <tr key={consultation.id} className={s.tableRowOfPastConsultations}>
                <td>укажет специалист</td>
                <td>укажет специалист</td>
                <td>
                  {
                    specialists.find(s => s.id === consultation.specialistId)
                      ?.name
                  }
                </td>
                <td
                  style={{
                    cursor: 'pointer',
                    color: '#6f61d0',
                    textAlign: 'right',
                  }}
                  onClick={onSendMessageClick(
                    specialists.find(s => s.id === consultation.specialistId)
                      ?.userId,
                  )}
                >
                открыть диалог
                </td>
              </tr>
            ))
          )
          : (
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
        {inactiveConsultations.length !== 0
          ? (
            inactiveConsultations.map((consultation: Consultation) => (
              <tr key={consultation.id} className={s.tableRowOfPastConsultations}>
                <td>{moment(consultation.date).format('LL')}</td>
                <td>{moment(consultation.date).format('LT')}</td>
                <td>
                  {
                    specialists.find(s => s.id === consultation.specialistId)
                      ?.name
                  }
                </td>
              </tr>
            ))
          )
          : (
            <tr className={s.tableRow}>
              <td className={s.tableNoData}>Нет данных</td>
            </tr>
          )}
      </table>
    </div>
  );
};
