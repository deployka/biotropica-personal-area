import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Consultation } from '../../store/ducks/consultation/contracts/state';
import { fetchConsultationsData } from '../../store/ducks/consultations/actionCreators';
import { selectConsultationsData } from '../../store/ducks/consultations/selectors';
import { fetchSpecialistsData } from '../../store/ducks/specialists/actionCreators';
import { selectFilteredSpecialistsData } from '../../store/ducks/specialists/selectors';
import { chatApi } from '../../shared/Global/Chat/services/chatApi';
import { eventBus, EventTypes } from '../../services/EventBus';
import { differenceInDays } from 'date-fns';

import s from './Consultations.module.scss';
import { ConsultationsTable } from '../../components/Consultations/Table/Table';

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

      <div className={s.tableContainer}>
        <ConsultationsTable
          specialists={specialists}
          activeConsultations={activeConsultations}
          consultationsWithoutData={consultationsWithoutData}
          inactiveConsultations={inactiveConsultations}
          moveToConsultation={moveToConsultation}
          onSendMessageClick={onSendMessageClick}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
