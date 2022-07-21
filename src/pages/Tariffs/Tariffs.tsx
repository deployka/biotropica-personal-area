import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../store/slices/authSlice';
import { TariffAddModal } from '../../components/Tariff/AddModal/AddModal';
import { TariffsList } from '../../components/Tariff/List/List';
import { TariffAdminHeader } from '../../components/Tariff/AdminHeader/AdminHeader';
import {
  useGetAllTariffsQuery,
  useGetCurrentTariffQuery,
  useSelectTariffMutation,
} from '../../api/tariffs';
import { Tariff } from '../../@types/entities/Tariff';
import Modal from '../../shared/Global/Modal/Modal';
import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';

import './paymentForm.scss';
import { NotificationButtons } from './NotificationButtons';
import { useGetInvoiceByProductUuidQuery } from '../../api/invoice';

const Tariffs = () => {
  // FIXME: refetch
  const {
    data: tariffs,
    isLoading,
    isError,
    refetch: refetchTariffs,
  } = useGetAllTariffsQuery();
  const [selectTariff, { isLoading: isSelectTariffLoading }] =
    useSelectTariffMutation();
  const [paymentForm, setPaymentForm] = useState('');

  const [isMobile, setIsMobile] = useState(false);

  const [isAddTariffModalVisible, setIsAddTariffModalVisible] = useState(false);
  const { data: currentTariff } = useGetCurrentTariffQuery();
  const { data: invoice } = useGetInvoiceByProductUuidQuery(
    currentTariff?.uuid || '',
    {
      skip: !currentTariff?.uuid,
    },
  );

  const isAdmin = useSelector(selectIsAdmin);

  async function onSelectTariff(tariff: Tariff) {
    try {
      if (
        invoice?.paymentForm &&
        !currentTariff?.expiredAt &&
        currentTariff?.tariff.id === tariff.id
      ) {
        return setPaymentForm(invoice.paymentForm);
      }
      const { tinkoffForm } = await selectTariff(tariff.id).unwrap();
      setPaymentForm(tinkoffForm);
    } catch (error) {
      console.log(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Произошла ошибка',
        type: NotificationType.DANGER,
      });
    }
  }

  function onDiscardChangeTariff() {
    //
  }

  async function handleSelectTariff(tariff: Tariff) {
    if (currentTariff) {
      eventBus.emit(EventTypes.notification, {
        title: `У вас уже есть тариф "${currentTariff.tariff.title}". Вы хотите заменить его?`,
        message: (
          <NotificationButtons
            onChange={() => onSelectTariff(tariff)}
            onDiscard={onDiscardChangeTariff}
          />
        ),
        type: NotificationType.INFO,
        theme: 'dark',
      });
      return;
    }
    onSelectTariff(tariff);
  }

  useEffect(() => {
    if (document.documentElement.clientWidth <= 500) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      {isAdmin && (
        <TariffAdminHeader onClick={() => setIsAddTariffModalVisible(true)} />
      )}
      <TariffsList
        tariffs={tariffs}
        isLoading={isLoading}
        isSelectLoading={isSelectTariffLoading}
        isError={isError}
        isMobile={isMobile}
        onSelect={handleSelectTariff}
        refetchTariffs={refetchTariffs}
      />
      <TariffAddModal
        isVisible={isAddTariffModalVisible}
        refetchTariffs={refetchTariffs}
        onClose={() => setIsAddTariffModalVisible(false)}
      />
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
    </>
  );
};

export default Tariffs;
