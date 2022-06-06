import React, { useEffect, useState } from 'react';
import s from './Consultation.module.scss';
import { Zoom } from '../../shared/Modules/Zoom';
import { useHistory, useParams } from 'react-router';
import ConsultationService from '../../services/ConsultationService';
import { Consultation } from '../../store/ducks/consultation/contracts/state';
import { useRequestUserDataQuery } from '../../store/rtk/requests/user';

export function ConsultationPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>();
  useEffect(() => {
    ConsultationService.getOne(+id).then(res => {
      setConsultation(res.data);
    });
  }, [id]);

  const { data: currentUser } = useRequestUserDataQuery();
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
