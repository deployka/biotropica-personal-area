import React from 'react';
import { useHistory } from 'react-router';
import { eventBus, EventTypes } from '../../services/EventBus';
import { differenceInDays } from 'date-fns';

import s from './Consultations.module.scss';
import { ConsultationsTable } from '../../components/Consultations/Table/Table';
import { useGetConsultationsQuery } from '../../api/consultations';
import { useGetSpecialistsQuery } from '../../api/specialists';
import { useCreateDialogMutation } from '../../api/chat';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { ResponseError } from '../../@types/api/response';
import Button from '../../components/Button/Button';

export const ConsultationsList = () => {
  const history = useHistory();

  const { data: specialists = [] } = useGetSpecialistsQuery();
  const { data: consultations = [] } = useGetConsultationsQuery();
  const [createDialog] = useCreateDialogMutation();

  const activeConsultations = consultations.filter(
    c => differenceInDays(new Date().getTime(), new Date(c.date || '')) <= 0,
  );
  const inactiveConsultations = consultations.filter(
    c => differenceInDays(new Date().getTime(), new Date(c.date || '')) > 0,
  );
  const consultationsWithoutData = consultations.filter(c => !c.date);

  const moveToConsultation = (id: number) => {
    history.push(`/consultations/list/${id}`);
  };

  async function sendMessage(userId: number) {
    try {
      const dialog = await createDialog({ userId, isAccess: true }).unwrap();
      eventBus.emit(EventTypes.chatOpen, dialog.id);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }

  console.log('consultations', consultations);

  return (
    <div className={s.usersList}>
      <div className={s.header}>
        <div className={s.headerLeft}>
          <h2 className={s.headerTitle}>Мои видеоконсультации</h2>
          <span className={s.usersCount}>{activeConsultations.length}</span>
        </div>
        <div className={s.headerRight}>
          <Button
            onClick={() => {
              history.push('/consultations');
            }}
          >
            Список специалистов
          </Button>
        </div>
      </div>

      <div className={s.tableContainer}>
        <ConsultationsTable
          specialists={specialists}
          activeConsultations={activeConsultations}
          consultationsWithoutData={consultationsWithoutData}
          inactiveConsultations={inactiveConsultations}
          moveToConsultation={moveToConsultation}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
