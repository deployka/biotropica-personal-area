import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ISelect } from '../../shared/Form/Select/SelectCustom';
import { InfoBar } from '../../shared/Global/InfoBar/InfoBar';

import moment from 'moment';
import { useQuery } from '../../hooks/useQuery';
import { useHistory, useLocation } from 'react-router';

import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { Button } from '../../shared/Form/Button/Button';
import { FREE_CONSULTATIONS_COUNT } from '../../constants/consultations';
import { Link } from 'react-router-dom';

import s from './Consultations.module.scss';
import { ConsultationsSearchForm } from '../../components/Consultations/SortForm/SortForm';
import { ConsultationsList } from '../../components/Consultations/List/List';
import { useGetSpecialistsQuery } from '../../api/specialists';
import {
  useCreateConsultationMutation,
  useGetClosestConsultationQuery,
  useGetConsultationsQuery,
  useGetLastConsultationQuery,
} from '../../api/consultations';
import { Specialist } from '../../@types/entities/Specialist';
import { useCreateDialogMutation } from '../../api/chat';
import { ResponseError } from '../../@types/api/response';

const Consultations = () => {
  const queryParam = useQuery();
  const history = useHistory();
  const location = useLocation();
  const sort = queryParam.get('sort');

  const [notificationId, setNotificationId] = useState('');
  const [createDialog] = useCreateDialogMutation();

  async function sendMessage(userId: number) {
    try {
      const dialog = await createDialog({ userId }).unwrap();
      eventBus.emit(EventTypes.chatOpen, dialog.id);
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }

  useEffect(() => {
    return () => {
      eventBus.emit(EventTypes.removeNotification, notificationId);
    };
  }, [notificationId]);

  const { data: specialists = [] } = useGetSpecialistsQuery();
  const { data: consultations = [], refetch: refetchConsultations } =
    useGetConsultationsQuery();

  const { data: closestConsultation } = useGetClosestConsultationQuery();
  const { data: LastAddedConsultation } = useGetLastConsultationQuery();

  const [createConsultation, { isLoading }] = useCreateConsultationMutation();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<
    ISelect<string>[] | undefined
  >(sort ? [{ label: sort, value: sort }] : undefined);

  const filteredSpecialists = useMemo(() => {
    if (!selectedSort?.[0]) return [];
    return specialists.filter(spec =>
      spec.specializations.reduce(
        (_, s) => s.key === selectedSort[0].value,
        false as boolean,
      ),
    );
  }, [selectedSort, specialists]);

  function searchSpecialistsByQuery(specialists: Specialist[], query: string) {
    return specialists.filter((spec: Specialist) =>
      Object.keys(spec).some(key =>
        String(spec[key as keyof Specialist])
          .toLowerCase()
          .includes(query),
      ),
    );
  }

  const searchedAndFilteredSpecialists = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const label = selectedSort?.[0]?.label;

    if (!filteredSpecialists.length && label) return [];
    if (!query && !filteredSpecialists.length) return specialists;
    if (!query && filteredSpecialists.length) return filteredSpecialists;
    if (query && filteredSpecialists.length) {
      return searchSpecialistsByQuery(filteredSpecialists, query);
    }
    return searchSpecialistsByQuery(specialists, query);
  }, [filteredSpecialists, searchQuery, selectedSort, specialists]);

  const getFreeConsultationsCount = useCallback(() => {
    if (FREE_CONSULTATIONS_COUNT - consultations.length > 0) {
      return FREE_CONSULTATIONS_COUNT - consultations.length;
    }
    return 0;
  }, [consultations.length]);

  const InfoBarClosestConsultationOptions = {
    title: 'Ближайшая запись',
    text: `Ваша ближайшая запись на персональную консультацию у ${
      specialists.find(s => s.id === closestConsultation?.specialistId)?.user
        .name
    } ${moment(closestConsultation?.date).format('Do MMMM в H:mm')}`,
    textLink: 'перейти в диалог',
    bottomLink: `Остаток бесплатных консультаций: 
    ${getFreeConsultationsCount()}  из ${FREE_CONSULTATIONS_COUNT}`,
    href: '',
    onClick: () => {
      const specialist = specialists.find(
        s => s.id === closestConsultation?.specialistId,
      );
      if (!specialist) {
        return;
      }
      return sendMessage(specialist.user.id);
    },
  };
  const InfoBarLastConsultationOptions = {
    title: 'Консультация без даты!',
    text: `Вы записались на консультацию к специалисту  ${
      specialists.find(s => s.id === LastAddedConsultation?.specialistId)?.user
        .name
    }, пожалуйста, обсудите удобное время и дату консультацию в чате.`,
    textLink: 'перейти в диалог',
    bottomLink: `Остаток бесплатных консультаций: 
    ${getFreeConsultationsCount()} из ${FREE_CONSULTATIONS_COUNT}`,
    href: '',
    onClick: () => {
      const specialist = specialists.find(
        s => s.id === LastAddedConsultation?.specialistId,
      );
      if (!specialist) {
        return;
      }
      return sendMessage(specialist.user.id);
    },
  };
  function onSelectChange(sort: ISelect<string>[] | undefined) {
    setSelectedSort(sort);
    queryParam.set('sort', sort?.[0]?.label || '');
    history.push(location.pathname + '?' + queryParam.toString());
  }

  function onSearchChange(query: string) {
    setSearchQuery(query);
  }

  async function onCreateConsultation(specialistId: number) {
    try {
      if (consultations.length < FREE_CONSULTATIONS_COUNT) {
        await createConsultation({ specialistId }).unwrap();
        eventBus.emit(EventTypes.notification, {
          title: 'Успешно!',
          message: 'Вы успешно записались на консультацию!',
          type: NotificationType.SUCCESS,
        });
        refetchConsultations();
      } else {
        console.log('pay');
        // TODO: перенаправление на оплату
      }
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  }

  const onSignUpClick = (
    specialistId: number,
    userId: number,
    setClick: (click: boolean) => void,
  ) => {
    eventBus.emit(EventTypes.notification, {
      title: `Записаться к ${
        specialists.find(s => s.id === specialistId)?.user.name
      }?`,
      message: (
        <>
          <Button
            style={{
              marginRight: '20px',
              marginBottom: '5px',
              marginTop: '5px',
              background: '#fff',
              color: '#000',
            }}
            onClick={() => onCreateConsultation(specialistId)}
            options={{
              content: 'Записаться',
              width: '100px',
              height: '30px',
            }}
          />
          <Button
            style={{
              color: '#fff',
              marginBottom: '5px',
              marginTop: '5px',
              border: '1px solid #fff',
            }}
            name="discard"
            options={{
              content: 'Отмена',
              width: '100px',
              height: '30px',
              classes: { discard: true },
            }}
          />
        </>
      ),
      type: NotificationType.INFO,
      theme: 'dark',
      autoClose: false,
      toastId: specialistId.toString(),
      onClose: () => {
        setClick(false);
      },
    });
    setNotificationId((prevId: string) => {
      if (prevId !== specialistId.toString()) {
        eventBus.emit(EventTypes.removeNotification, prevId);
      }
      return specialistId.toString();
    });
  };

  return (
    <div className={s.consultations}>
      {closestConsultation && (
        <InfoBar infoBar={InfoBarClosestConsultationOptions} />
      )}
      {LastAddedConsultation && (
        <InfoBar infoBar={InfoBarLastConsultationOptions} />
      )}
      <div className={s.headerWrapper}>
        <ConsultationsSearchForm
          onSelectChange={onSelectChange}
          selectValue={selectedSort}
          onSearchChange={onSearchChange}
          searchValue={searchQuery}
        />
        <div className={s.link}>
          <Link to="/consultations/list">Мои видеоконсультации</Link>
        </div>
      </div>
      <ConsultationsList
        consultationsCount={consultations.length}
        isLoadingSignUp={isLoading}
        onSignUpClick={onSignUpClick}
        searchQuery={searchQuery}
        specialists={searchedAndFilteredSpecialists}
      />
    </div>
  );
};

export default Consultations;
