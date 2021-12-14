import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SpecialistsList } from './../components/SpecialistsList/SpecialistsList';
import { SearchForm } from '../components/SearchForm/SortForm';

import { ISelect } from '../../../shared/Form/Select/SelectCustom';
import { Specialist } from '../../../store/ducks/specialist/contracts/state';
import { fetchSpecialistsData } from '../../../store/ducks/specialists/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredSpecialistsData } from '../../../store/ducks/specialists/selectors';
import { InfoBar } from '../../../shared/Global/InfoBar/InfoBar';
import {
  createConsultationData,
  fetchClosestConsultationData,
  setConsultationResponse,
} from '../../../store/ducks/consultation/actionCreators';
import {
  selectClosestConsultationData,
  selectConsultationData,
  selectConsultationLoadingStatus,
  selectConsultationResponse,
} from '../../../store/ducks/consultation/selectors';
import {
  ClosestConsultation,
  Consultation,
} from '../../../store/ducks/consultation/contracts/state';
import moment from 'moment';
import { useQuery } from '../../../hooks/useQuery';
import { useHistory, useLocation } from 'react-router';

import s from './Consultations.module.scss';
import { LoadingStatus, Response } from '../../../store/types';

import { eventBus, EventTypes } from '../../../services/EventBus';
import { NotificationType } from '../../../components/GlobalNotifications/GlobalNotifications';
import ConsultationService from '../../../services/ConsultationService';
import { Button } from '../../../shared/Form/Button/Button';
import { FREE_CONSULTATIONS_COUNT } from '../../../constants/consultations';
import {chatApi} from "../../../shared/Global/Chat/services/chatApi";

async function sendMessage(userId: number) {
  const dialog = await chatApi.create(userId);
  eventBus.emit(EventTypes.chatOpen, dialog.id);
}

const Consultations = () => {
  const dispatch = useDispatch();
  const queryParam = useQuery();
  const history = useHistory();
  const location = useLocation();
  const sort = queryParam.get('sort');

  const [consultationsCount, setConsultationsCount] = useState(0);
  const [notificationId, setNotificationId] = useState('');

  useEffect(() => {
    dispatch(fetchSpecialistsData());
    dispatch(fetchClosestConsultationData());
  }, []);

  useEffect(() => {
    return () => {
      eventBus.emit(EventTypes.removeNotification, notificationId);
    };
  }, [notificationId]);

  const loadingStatus = useSelector(selectConsultationLoadingStatus);
  const isLoading = loadingStatus === LoadingStatus.LOADING;
  const response: Response | undefined = useSelector(
    selectConsultationResponse
  );

  const specialists: Specialist[] = useSelector(selectFilteredSpecialistsData);
  const closestConsultation: ClosestConsultation | undefined = useSelector(
    selectClosestConsultationData
  );
  const LastAddedConsultation: Consultation | undefined = useSelector(
    selectConsultationData
  );

  useEffect(() => {
    function getAllConsultations() {
      ConsultationService.geAll().then(({ data }) => {
        setConsultationsCount(data.length);
      });
    }
    getAllConsultations();
  }, [closestConsultation, LastAddedConsultation]);

  function onSuccessCreateNotification() {
    eventBus.emit(EventTypes.notification, {
      title: 'Успешно!',
      message: response?.message || 'Успешно!',
      type: NotificationType.SUCCESS,
    });
    dispatch(setConsultationResponse(undefined));
  }

  function onErrorCreateNotification() {
    dispatch(setConsultationResponse(undefined));
  }

  useEffect(() => {
    if (!response) return;
    switch (loadingStatus) {
      case LoadingStatus.SUCCESS:
        onSuccessCreateNotification();
        break;
      case LoadingStatus.ERROR:
        onErrorCreateNotification();
        break;
      default:
        break;
    }
  }, [loadingStatus, response]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<ISelect<string>[] | null>(
    sort ? [{ label: sort, value: sort }] : null
  );

  const filteredSpecialists = useMemo(() => {
    if (!selectedSort?.[0]) return [];
    return specialists.filter(spec =>
      spec.specializations.includes(selectedSort[0].label)
    );
  }, [selectedSort, specialists]);

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
  }, [searchQuery, selectedSort, specialists]);

  function searchSpecialistsByQuery(specialists: Specialist[], query: string) {
    return specialists.filter((spec: Specialist) =>
      Object.keys(spec).some(key =>
        String(spec[key as keyof Specialist])
          .toLowerCase()
          .includes(query)
      )
    );
  }

  const getFreeConsultationsCount = useCallback(() => {
    if (FREE_CONSULTATIONS_COUNT - consultationsCount > 0) {
      return FREE_CONSULTATIONS_COUNT - consultationsCount;
    }
    return 0;
  }, [consultationsCount, FREE_CONSULTATIONS_COUNT]);

  const InfoBarClosestConsultationOptions = {
    title: 'Ближайшая запись',
    text: `Ваша ближайшая запись на персональную консультацию у ${
      specialists.find(s => s.id === closestConsultation?.specialistId)?.name
    } ${moment(closestConsultation?.date).format('Do MMMM в h:mm')}`,
    textLink: 'перейти в диалог',
    bottomLink: `Остаток бесплатных консультаций: ${getFreeConsultationsCount()}  из ${FREE_CONSULTATIONS_COUNT}`,
    href: '',
    onClick: () => {
      const specialist = specialists.find(s => s.id === closestConsultation?.specialistId);
      if(!specialist) {
        return;
      }
      return sendMessage(specialist.userId)
    },
  };

  const InfoBarLastConsultationOptions = {
    title: 'Консультация без даты!',
    text: `Вы записались на консультацию к специалисту  ${
      specialists.find(s => s.id === LastAddedConsultation?.specialistId)?.name
    }, пожалуйста, обсудите удобное время и дату консультацию в чате.`,
    textLink: 'перейти в диалог',
    bottomLink: `Остаток бесплатных консультаций: ${getFreeConsultationsCount()} из ${FREE_CONSULTATIONS_COUNT}`,
    href: '',
    onClick: () => {
      const specialist = specialists.find(s => s.id === LastAddedConsultation?.specialistId);
      if(!specialist) {
        return;
      }
      return sendMessage(specialist.userId)
    },
  };

  function onSelectChange(sort: ISelect<string>[] | null) {
    setSelectedSort(sort);
    queryParam.set('sort', sort?.[0]?.label || '');
    history.push(location.pathname + '?' + queryParam.toString());
  }

  function onSearchChange(query: string) {
    setSearchQuery(query);
  }

  const onSignUpClick = (
    specialistId: number,
    userId: number,
    setClick: (click: boolean) => void
  ) => {
    eventBus.emit(EventTypes.notification, {
      title: `Записаться к ${
        specialists.find(s => s.id === specialistId)?.name
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
            onClick={() => {
              ConsultationService.geAll().then(({ data }) => {
                if (data.length < FREE_CONSULTATIONS_COUNT) {
                  dispatch(createConsultationData({ specialistId }));
                  //TODO: dispatch(CreateDialog(userId));
                } else {
                  console.log('pay');
                  //TODO: перенаправление на оплату
                }
              });
            }}
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
            onClick={() => {}}
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
      dismiss: undefined,
      id: specialistId.toString(),
      onRemoval: () => {
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
      <SearchForm
        onSelectChange={onSelectChange}
        selectValue={selectedSort}
        onSearchChange={onSearchChange}
        searchValue={searchQuery}
      />
      <SpecialistsList
        consultationsCount={consultationsCount}
        isLoadingSignUp={isLoading}
        onSignUpClick={onSignUpClick}
        searchQuery={searchQuery}
        specialists={searchedAndFilteredSpecialists}
      />
    </div>
  );
};

export default Consultations;
