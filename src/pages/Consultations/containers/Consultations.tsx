import React, { useEffect, useMemo, useState } from 'react';
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
import { store } from 'react-notifications-component';
import { notification } from '../../../config/notification/notificationForm';
import { CreateDialog } from '../../../store/ducks/chat/actionCreators';

const Consultations = () => {
  const dispatch = useDispatch();
  const queryParam = useQuery();
  const history = useHistory();
  const location = useLocation();
  const sort = queryParam.get('sort');

  useEffect(() => {
    dispatch(fetchSpecialistsData());
    dispatch(fetchClosestConsultationData());
  }, []);

  useEffect(() => {
    dispatch(fetchClosestConsultationData());
  }, []);

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

  function onSuccessCreateNotification() {
    store.addNotification({
      ...notification,
      title: 'Успешно!',
      message: response?.message || 'Успешно!',
      type: 'success',
    });
    dispatch(setConsultationResponse(undefined));
  }

  function onErrorCreateNotification() {
    store.addNotification({
      ...notification,
      title: 'Произошла ошибка!',
      message: response?.message || 'Произошла непредвиденная ошибка!',
      type: 'danger',
    });
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

  const InfoBarClosestConsultationOptions = {
    title: 'Ближайшая запись',
    text: `Ваша ближайшая запись на персональную консультацию у ${
      specialists.find(s => s.id === closestConsultation?.specialistId)?.name
    } ${moment(closestConsultation?.createdAt).format('Do MMMM в h:mm')}`,
    textLink: 'перейти в диалог',
    bottomLink: 'Осталось 3 из 3 бесплатные консультации ',
    href: '',
    onClick: () => {
      console.log('dialog');
    },
  };

  const InfoBarLastConsultationOptions = {
    title: 'Консультация без даты!',
    text: `Вы записались на консультацию к специалисту  ${
      specialists.find(s => s.id === LastAddedConsultation?.specialistId)?.name
    }, пожалуйста, обсудите удобное время и дату консультацию в чате.`,
    textLink: 'перейти в диалог',
    bottomLink: 'Осталось 3 из 3 бесплатные консультации ',
    href: '',
    onClick: () => {
      console.log('dialog');
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

  function onSignUpClick(specialistId: number, userId: number) {
    dispatch(createConsultationData({ specialistId }));
    //TODO: dispatch(CreateDialog(userId));
  }

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
        isLoadingSignUp={isLoading}
        onSignUpClick={onSignUpClick}
        searchQuery={searchQuery}
        specialists={searchedAndFilteredSpecialists}
      />
    </div>
  );
};

export default Consultations;
