import React, { useEffect, useState, useRef, useContext } from 'react';
import { Zoom } from '../../shared/Modules/Zoom/Zoom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/ducks/user/selectors';
import { useParams } from 'react-router';
import ConsultationService from '../../services/ConsultationService';
import { Consultation } from '../../store/ducks/consultation/contracts/state';
import { config } from '../../config/zoom';

import s from './Consultation.module.scss';

export function ConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>();
  const currentUser = useSelector(selectUserData);

  useEffect(() => {
    ConsultationService.getOne(+id).then(res => {
      setConsultation(res.data);
    });
  }, []);

  if (!currentUser || !consultation) return null;

  return (
    <Zoom
      sdkKey={config.sdkKey}
      sdkSecret={config.sdkSecret}
      leaveUrl="/consultations"
      meetingNumber={consultation.meetingNumber}
      passWord={consultation?.meetingPassword}
      userName={currentUser.name + ' ' + currentUser.lastname}
    />
  );
}
