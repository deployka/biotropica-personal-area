import React, { useEffect, useMemo, useState } from 'react';

import { ISelect } from '../../shared/Form/Select/SelectCustom';
import { InfoBar } from '../../shared/Global/InfoBar/InfoBar';

import moment from 'moment';
import { useQuery } from '../../hooks/useQuery';
import { useHistory, useLocation } from 'react-router';

import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';
import { Button } from '../../shared/Form/Button/Button';
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
import { useCreateDialogMutation } from '../../api/chat';
import { ResponseError } from '../../@types/api/response';
import { useSelector } from 'react-redux';
import {
  selectFreeConsultationsCount,
  selectRestOfFreeConsultationsCount,
} from '../../store/slices/tariff';
import { searchSpecialistsByQuery } from './consultationsHelper';
import Modal from '../../shared/Global/Modal/Modal';
import {
  useGetInvoiceByProductUuidQuery,
  useGetStatusByProductUuidQuery,
} from '../../api/invoice';
import {
  getInvoiceStatusByProduct,
  getInvoiceStatusColor,
} from '../../utils/invoice';
import { Consultation } from '../../@types/entities/Consultation';
import { PayBtn } from './PayBtn';

const Consultations = () => {
  const queryParam = useQuery();
  const history = useHistory();
  const location = useLocation();
  const sort = queryParam.get('sort');

  const [notificationId, setNotificationId] = useState('');
  const [createDialog] = useCreateDialogMutation();

  const [paymentForm, setPaymentForm] = useState('');

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

  useEffect(() => {
    return () => {
      eventBus.emit(EventTypes.removeNotification, notificationId);
    };
  }, [notificationId]);

  const { data: specialists = [], isLoading: isSpecialistLoading } =
    useGetSpecialistsQuery();
  const {
    data: consultations = [],
    isLoading: isConsultationsLoading,
    refetch: refetchConsultations,
  } = useGetConsultationsQuery();

  const { data: closestConsultation } = useGetClosestConsultationQuery();
  const { data: lastAddedConsultation } = useGetLastConsultationQuery();

  const [createConsultation, { isLoading }] = useCreateConsultationMutation();
  const freeConsultationCount = useSelector(selectFreeConsultationsCount);
  const restOfFreeConsultationsCount = useSelector(
    selectRestOfFreeConsultationsCount,
  );

  const { data: invoiceInfo } = useGetStatusByProductUuidQuery(
    lastAddedConsultation?.uuid || '',
    { skip: !lastAddedConsultation?.uuid },
  );
  const { data: invoice } = useGetInvoiceByProductUuidQuery(
    lastAddedConsultation?.uuid || '',
    { skip: !lastAddedConsultation?.uuid },
  );

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<
    ISelect<string>[] | undefined
  >(sort ? [{ label: sort, value: sort }] : undefined);

  const filteredSpecialists = useMemo(() => {
    if (!selectedSort?.[0]) return [];
    console.log('select:', selectedSort);

    return specialists.filter(spec => {
      return !!spec.specializations.find(
        specialization => specialization.key === selectedSort[0].value,
      );
    });
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
  }, [filteredSpecialists, searchQuery, selectedSort, specialists]);

  const onChangeSelect = (sort: ISelect<string>[] | undefined) => {
    setSelectedSort(sort);
    queryParam.set('sort', sort?.[0]?.label || '');
    history.push(location.pathname + '?' + queryParam.toString());
  };
  const onSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const getSpecialistName = (cns?: Consultation) =>
    specialists.find(s => s.id === cns?.specialistId)?.user.name;

  const getCnsDate = (cns?: Consultation) =>
    moment(cns?.date).format('Do MMMM в H:mm');

  const onOpenDialog = (cns?: Consultation) => {
    const specialist = specialists.find(s => s.id === cns?.specialistId);
    if (!specialist) {
      return;
    }
    return sendMessage(specialist.user.id);
  };

  const InfoBarClosestConsultationOptions = {
    title: 'Ближайшая запись',
    text: `Ваша ближайшая запись на персональную консультацию у ${getSpecialistName(
      closestConsultation,
    )} ${getCnsDate(closestConsultation)}`,
    textLink: 'перейти в диалог',
    bottomLink: `Остаток бесплатных консультаций: 
    ${restOfFreeConsultationsCount}  из ${freeConsultationCount}`,
    href: '',
    onClick: () => onOpenDialog(closestConsultation),
  };

  const status = getInvoiceStatusByProduct(
    invoiceInfo?.status || 'failed',
    'consultation',
  );

  const onPayClick = () => setPaymentForm(invoice?.paymentForm || '');

  const InfoBarLastConsultationOptions = {
    title: 'Консультация без даты!',
    text: `Вы записались на консультацию к специалисту  ${getSpecialistName(
      lastAddedConsultation,
    )}, пожалуйста, обсудите удобное время и дату консультацию в чате, после подтверждения оплаты.`,
    textLink:
      lastAddedConsultation?.isPaid || lastAddedConsultation?.isFree
        ? 'перейти в диалог'
        : '',
    bottomLink: lastAddedConsultation?.isFree ? (
      'Бесплатная консультация'
    ) : (
      <p style={{ display: 'flex' }}>
        Статус: &nbsp;
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            color: getInvoiceStatusColor(invoiceInfo?.status || 'failed'),
          }}
        >
          {status}&nbsp;
          {invoiceInfo?.status === 'waiting' && (
            <PayBtn onPayClick={onPayClick} />
          )}
        </p>
      </p>
    ),
    href: '',
    onClick: () => onOpenDialog(lastAddedConsultation),
  };

  function onSelectChange(sort: ISelect<string>[] | undefined) {
    setSelectedSort(sort);
    queryParam.set('sort', sort?.[0]?.label || '');
    history.push(location.pathname + '?' + queryParam.toString());
  }

  const onCreateConsultation = async (specialistId: number) => {
    try {
      if (restOfFreeConsultationsCount) {
        await createConsultation({ specialistId }).unwrap();
        eventBus.emit(EventTypes.notification, {
          title: 'Успешно!',
          message: 'Вы успешно записались на бесплатную консультацию!',
          type: NotificationType.SUCCESS,
        });
      } else {
        const { tinkoffForm } = await createConsultation({
          specialistId,
        }).unwrap();
        setPaymentForm(tinkoffForm);
      }
      refetchConsultations();
    } catch (error) {
      eventBus.emit(EventTypes.notification, {
        title: 'Произошла ошибка!',
        message: (error as ResponseError).data.message,
        type: NotificationType.DANGER,
      });
    }
  };

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
    <>
      <Modal
        isOpened={!!paymentForm}
        close={() => {
          setPaymentForm('');
        }}
      >
        <div>
          <p style={{ marginBottom: '15px' }}>Выберете способ оплаты:</p>
          <div dangerouslySetInnerHTML={{ __html: paymentForm }} />
        </div>
      </Modal>
      <div className={s.consultations}>
        {closestConsultation && (
          <InfoBar infoBar={InfoBarClosestConsultationOptions} />
        )}
        {lastAddedConsultation && (
          <InfoBar infoBar={InfoBarLastConsultationOptions} />
        )}
        <div className={s.headerWrapper}>
          <ConsultationsSearchForm
            onSelectChange={onChangeSelect}
            selectValue={selectedSort}
            onSearchChange={onSearchChange}
            searchValue={searchQuery}
          />

          <Link className={s.link} to="/consultations/list">
            Мои видеоконсультации
          </Link>
        </div>
        {isSpecialistLoading && <p>Загрузка...</p>}
        {!isSpecialistLoading && (
          <ConsultationsList
            restOfFreeConsultationsCount={restOfFreeConsultationsCount}
            isLoadingSignUp={isLoading}
            onSignUpClick={onSignUpClick}
            searchQuery={searchQuery}
            specialists={searchedAndFilteredSpecialists}
          />
        )}
      </div>
    </>
  );
};

export default Consultations;
