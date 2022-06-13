import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectIsAdmin, selectUserRoles } from '../../store/slices/authSlice';
import { TariffAddModal } from '../../components/Tariff/AddModal/AddModal';
import { TariffsList } from '../../components/Tariff/List/List';
import { TariffAdminHeader } from '../../components/Tariff/AdminHeader/AdminHeader';
import { ROLE } from '../../@types/entities/Role';
import { useGetAllTariffsQuery } from '../../api/tariffs';

const Tariffs = () => {
  // FIXME: refetch
  const {
    data: tariffs,
    isLoading,
    isError,
    refetch: refetchTariffs,
  } = useGetAllTariffsQuery();

  const [isMobile, setIsMobile] = useState(false);

  const [isAddTariffModalVisible, setIsAddTariffModalVisible] = useState(false);

  const isAdmin = useSelector(selectIsAdmin);

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
