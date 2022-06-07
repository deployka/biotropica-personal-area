import React from 'react';
import s from './Consultation.module.scss';
import { Zoom } from '../../shared/Modules/Zoom';
import { useHistory, useParams } from 'react-router';
import { useCurrentUserQuery } from '../../api/user';
import { useGetConsultationQuery } from '../../api/consultations';

export function ConsultationPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { data: consultation } = useGetConsultationQuery({ id: +id });

  const { data: currentUser } = useCurrentUserQuery();
  if (!currentUser || !consultation) {
    return null;
  }

  const username = currentUser.name + ' ' + currentUser.lastname;

  return (
    <Zoom
      className={s.consultation}
      meetingNumber={consultation.meetingNumber}
      password={consultation.meetingPassword}
      role={0}
      username={username}
      onClose={() => history.push('/consultations/list')}
    />
  );
}
