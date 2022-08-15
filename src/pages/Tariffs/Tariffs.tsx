import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../../store/slices/authSlice';

import { TariffsList } from '../../components/Tariff/List/List';
import { TariffAdminHeader } from '../../components/Tariff/AdminHeader/AdminHeader';
import {
  useAddTariffMutation,
  useDeleteTariffMutation,
  useGetAllTariffsQuery,
  useGetCurrentTariffQuery,
  useSelectTariffMutation,
  useUpdateTariffMutation,
  useUpdateTariffsOrderMutation,
} from '../../api/tariffs';
import { Tariff, TariffOrder } from '../../@types/entities/Tariff';
import Modal from '../../shared/Global/Modal/Modal';
import { eventBus, EventTypes } from '../../services/EventBus';
import { NotificationType } from '../../components/GlobalNotifications/GlobalNotifications';

import './paymentForm.scss';
import { NotificationButtons } from './NotificationButtons';
import { useGetInvoiceByProductUuidQuery } from '../../api/invoice';
import {
  showErrorNotificationAfterAddTariff,
  showErrorNotificationAfterUpdateOrders,
  showSuccessNotificationAfterAddTariff,
  showSuccessNotificationAfterUpdateOrders,
} from '../../utils/tariffHelper';
import { CreateTariffDto } from '../../@types/dto/tariffs/create.dto';
import { DeleteTariffDto } from '../../@types/dto/tariffs/delete.dto';
import { UpdateTariffDto } from '../../@types/dto/tariffs/update.dto';
import { EditTariffModal } from '../../components/Tariff/EditModal/EditModal';

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

  const [isMobile, setIsMobile] = useState(false);

  const isAdmin = useSelector(selectIsAdmin);

  const [editedTariff, setEditedTariff] = useState<Tariff | null>(null);
  const [isOrderEdit, setIsOrderEdit] = useState<boolean>(false);
  const [tariffOrderList, setTariffOrderList] = useState<TariffOrder[]>([]);

  const [isEditTariffModalOpen, setIsEditTariffModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (document.documentElement.clientWidth <= 500) {
      setIsMobile(true);
    }
  }, []);

  const [paymentForm, setPaymentForm] = useState('');

  const [addTariff] = useAddTariffMutation();
  const [updateTariff] = useUpdateTariffMutation();
  const [deleteTariff] = useDeleteTariffMutation();
  const [updateTariffsOrders] = useUpdateTariffsOrderMutation();

  const { data: currentTariff } = useGetCurrentTariffQuery();
  const { data: invoice } = useGetInvoiceByProductUuidQuery(
    currentTariff?.uuid || '',
    {
      skip: !currentTariff?.uuid,
    },
  );

  const resetTariffOrder = () => {
    const orders =
      tariffs?.map((tariff, id) => ({
        tariffId: tariff.id,
        order: tariff.order || 1,
      })) || [];

    setTariffOrderList(orders);
  };

  const onSelectTariff = async (tariff: Tariff) => {
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
  };
  const onDiscardChangeTariff = () => {
    //
  };
  const handleSelectTariff = async (tariff: Tariff) => {
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
  };
  const onClickAddTariff = () => {
    setIsEditTariffModalOpen(true);
    setEditedTariff(null);
  };
  const onClickEditTariff = (tariff: Tariff) => {
    setIsEditTariffModalOpen(true);
    setEditedTariff(tariff);
  };
  const onCancelEditOrder = () => {
    resetTariffOrder();
    setIsOrderEdit(false);
  };
  const closeEditTariffModal = () => {
    setIsEditTariffModalOpen(false);
    setEditedTariff(null);
  };
  const handleAddTariff = async (data: CreateTariffDto) => {
    try {
      await addTariff(data).unwrap();
      showSuccessNotificationAfterAddTariff();
      closeEditTariffModal();
    } catch (error) {
      console.log(error);
      showErrorNotificationAfterAddTariff();
    }
  };
  const handleUpdateTariff = async (data: UpdateTariffDto) => {
    try {
      await updateTariff(data).unwrap();
      showSuccessNotificationAfterAddTariff();
      closeEditTariffModal();
    } catch (error) {
      console.log(error);
      showErrorNotificationAfterAddTariff();
    }
  };
  const handleDeleteTariff = async (data: DeleteTariffDto) => {
    try {
      await deleteTariff({ id: data.id }).unwrap();
      showSuccessNotificationAfterAddTariff();
      closeEditTariffModal();
    } catch (error) {
      console.log(error);
      showErrorNotificationAfterAddTariff();
    }
  };
  const handleSaveOrder = async () => {
    const updateOrdersData = {
      ordersList: tariffOrderList,
    };
    try {
      await updateTariffsOrders(updateOrdersData).unwrap();
      showSuccessNotificationAfterUpdateOrders();
      setIsOrderEdit(false);
    } catch (error) {
      console.log(error);
      showErrorNotificationAfterUpdateOrders();
    }
    console.log(tariffOrderList);
  };

  useEffect(() => {
    resetTariffOrder();
  }, [tariffs]);

  return (
    <>
      {isAdmin && (
        <TariffAdminHeader
          isOrderEdit={isOrderEdit}
          onCancelEditOrder={onCancelEditOrder}
          onAddTariff={onClickAddTariff}
          onEditOrder={() => setIsOrderEdit(true)}
          onSaveOrder={handleSaveOrder}
        />
      )}
      <TariffsList
        tariffs={tariffs}
        isLoading={isLoading}
        isSelectLoading={isSelectTariffLoading}
        isError={isError}
        isMobile={isMobile}
        tariffOrderList={tariffOrderList}
        isEditableOrder={isOrderEdit}
        onEdit={onClickEditTariff}
        onSelect={handleSelectTariff}
        refetchTariffs={refetchTariffs}
        setTariffOrderList={setTariffOrderList}
      />
      <EditTariffModal
        mode={editedTariff ? 'edit' : 'create'}
        isOpened={isEditTariffModalOpen}
        tariff={editedTariff}
        onCreate={handleAddTariff}
        onUpdate={handleUpdateTariff}
        onDelete={() => handleDeleteTariff({ id: editedTariff?.id || -1 })}
        onClose={closeEditTariffModal}
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
