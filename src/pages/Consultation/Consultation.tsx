import React, { useEffect, useState, useRef, useContext } from 'react';
import { Zoom } from '../../shared/Modules/Zoom/Zoom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/ducks/user/selectors';
import { useParams } from 'react-router';
import ConsultationService from '../../services/ConsultationService';
import { Consultation } from '../../store/ducks/consultation/contracts/state';
import { config } from '../../config/zoom';

import s from './Consultation.module.scss';
import { generateSignature } from '../../utils/generateSignature';

export function ConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>();
  const currentUser = useSelector(selectUserData);

  useEffect(() => {
    ConsultationService.getOne(+id).then(res => {
      setConsultation(res.data);
    });
  }, [id]);

  if (!currentUser || !consultation) return null;

  const role = currentUser.roles.includes('SPECIALIST') ? 1 : 0;

  const signature = generateSignature(
    config.sdkKey,
    config.sdkSecret,
    consultation.meetingNumber,
    role,
  );

  return (
    <Zoom
      sdkKey={config.sdkKey}
      signature={signature}
      leaveUrl="/consultations"
      meetingNumber={consultation.meetingNumber}
      passWord={consultation?.meetingPassword}
      userName={currentUser.name + ' ' + currentUser.lastname}
    />
  );
}
