import React, { useEffect, useRef } from 'react';
import s from './Consultation.module.scss';
import { Zoom } from '../../shared/Modules/Zoom';
import { useHistory, useParams } from 'react-router';
import { useCurrentUserQuery } from '../../api/user';
import {
  useGetConsultationQuery,
  useLazyGenerateZAKQuery,
} from '../../api/consultations';
import { ROLE } from '../../@types/entities/Role';
import { generateSignature } from '../../utils/generateSignature';
import { zoomConfig } from '../../config/zoom';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

const zoomClient = ZoomMtgEmbedded.createClient();

export function ConsultationPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const zoomRef = useRef<HTMLDivElement | null>(null);

  const [fetchZAKToken, { data: zakToken }] = useLazyGenerateZAKQuery();
  const { data: consultation, isFetching: isConsultationFetching } =
    useGetConsultationQuery({ id: +id });
  const { data: currentUser, isFetching: isCurrentUserFetching } =
    useCurrentUserQuery();

  const connectToConference = async () => {
    if (!consultation || !currentUser) {
      return;
    }

    zoomClient.init({
      zoomAppRoot: zoomRef.current!,
      language: 'ru-RU',
      // language: 'en-US',
      debug: true,
    });

    const isSpecialist = currentUser.roles.find(
      role => role.name === ROLE.TRAINER,
    );
    const role = isSpecialist ? 1 : 0;
    const userName = currentUser.name + ' ' + currentUser.lastname;

    let zakToken: string | undefined;
    if (isSpecialist) {
      ({ token: zakToken } = await fetchZAKToken().unwrap());
    }
    const signature = generateSignature(zoomConfig.sdkKey, zoomConfig.sdkSecret, consultation.meetingNumber, role);

    zoomClient.join({
      sdkKey: zoomConfig.sdkKey,
      signature,
      meetingNumber: consultation.meetingNumber,
      password: consultation.meetingPassword,
      userName,
      // userEmail: currentUser.email,
      // zak: zakToken,
    });
  };

  useEffect(() => {
    connectToConference();
  }, [consultation, currentUser]);

  if (!currentUser) {
    return <div>Пользователь не авторизован</div>;
  }
  if (isConsultationFetching || isCurrentUserFetching) {
    return <p>Загрузка...</p>;
  }
  if (!consultation) {
    return <div>Консультация не найдена</div>;
  }

  return (
    <div
      ref={node => {
        zoomRef.current = node;
      }}
    />

  // <Zoom
  //   className={s.consultation}
  //   meetingNumber={consultation.meetingNumber}
  //   password={consultation.meetingPassword}
  //   role={0}
  //   username={username}
  //   onClose={() => history.push('/consultations/list')}
  // />
  );
}
