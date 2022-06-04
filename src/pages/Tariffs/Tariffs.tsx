import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import PlusIcon from '../../assets/icons/plus.svg';
import Button from '../../components/Button/Button';
import { selectUserRoles } from '../../store/rtk/slices/authSlice';
import { useRequestTariffsQuery } from '../../store/rtk/requests/tariffs';
import { ROLE } from '../../store/rtk/types/user';
import { TariffAddModal } from '../../components/Tariff/AddModal/AddModal';
import { TariffsList } from '../../components/Tariff/List/List';

import s from './Tariffs.module.scss';
import { TariffAdminHeader } from '../../components/Tariff/AdminHeader/AdminHeader';

const Tariffs = () => {
  // FIXME: refetch
  const {
    data: tariffs,
    isLoading,
    isError,
    refetch: refetchTariffs,
  } = useRequestTariffsQuery();

  const [isMobile, setIsMobile] = useState(false);

  const [isAddTariffModalVisible, setIsAddTariffModalVisible] = useState(false);

  const roles = useSelector(selectUserRoles);

  const isAdmin = roles.includes(ROLE.ADMIN);

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
        isError={isError}
        isMobile={isMobile}
        refetchTariffs={refetchTariffs}
      />
      <TariffAddModal
        isVisible={isAddTariffModalVisible}
        refetchTariffs={refetchTariffs}
        onClose={() => setIsAddTariffModalVisible(false)}
      />
    </>
  );
};

export default Tariffs;
