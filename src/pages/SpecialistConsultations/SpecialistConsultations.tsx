import React, { useState, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router';
import useDeviceSize from '../../hooks/useDeviceSize';

import {
  useUpdateConsultationMutation,
  useDeleteConsultationMutation,
  useGetSpecialistConsultationsQuery,
  useUpdateConsultationDateMutation,
} from '../../api/consultations';
import { useGetCurrentSpecialistQuery } from '../../api/specialists';
import {
  SpecialistConsultation,
  SpecialistConsultationsList,
} from '../../components/SpecialistConsultations/List/List';

import {
  convertDateStringToObject,
  filterConsultationByQuery,
  formatConsultation,
} from './consultationsHelper';
import { SpecialistConsultationsDeleteModal } from '../../components/SpecialistConsultations/DeleteModal/DeleteModal';
import {
  errorDeleteConsultationNotification,
  errorUpdateConsultationNotification,
  successDeleteConsultationNotification,
  successUpdateConsultationNotification,
} from './specialistConsultationsNotifications';
import { SpecialistConsultationsEditModal } from '../../components/SpecialistConsultations/EditModal/EditModal';

const SpecialistConsultations = () => {
  const history = useHistory();

  const [deletedConsultationId, setDeletedConsultationId] = useState<
    number | null
  >(null);

  const [editedConsultation, setEditedConsultation] =
    useState<SpecialistConsultation | null>(null);

  const { data: specialist, isLoading: isSpecialistLoading } =
    useGetCurrentSpecialistQuery();

  const { data: consultations = [], isLoading: isConsultationsLoading } =
    useGetSpecialistConsultationsQuery(specialist?.id || -1, {
      skip: !specialist?.id,
    });
  const [deleteConsultation] = useDeleteConsultationMutation();
  const [changeConsultationDate] = useUpdateConsultationDateMutation();

  const handleMoveToConsultation = (id: number) => {
    return history.push('/consultations/' + id);
  };
  const handleUpdateConsultation = async (date: Date) => {
    if (!editedConsultation) return;
    try {
      await changeConsultationDate({
        id: editedConsultation.id,
        date,
      }).unwrap();
      successUpdateConsultationNotification();
      setDeletedConsultationId(null);
      setEditedConsultation(null);
    } catch (error) {
      errorUpdateConsultationNotification();
      setEditedConsultation(null);
    }
  };
  const handleDeleteConsultation = async () => {
    if (!deletedConsultationId) return;
    try {
      await deleteConsultation({ id: deletedConsultationId }).unwrap();
      successDeleteConsultationNotification();
      setDeletedConsultationId(null);
    } catch (error) {
      errorDeleteConsultationNotification();
      setDeletedConsultationId(null);
    }
  };

  if (isConsultationsLoading || isSpecialistLoading) {
    return <p>Загрузка</p>;
  }

  return (
    <>
      <SpecialistConsultationsList
        totalConsultationsCount={consultations.length}
        consultations={consultations}
        onMove={handleMoveToConsultation}
        onDelete={setDeletedConsultationId}
        onEdit={setEditedConsultation}
      />
      <SpecialistConsultationsDeleteModal
        isOpened={deletedConsultationId !== null}
        onAccept={handleDeleteConsultation}
        onClose={() => setDeletedConsultationId(null)}
      />
      <SpecialistConsultationsEditModal
        isOpened={editedConsultation !== null}
        onClose={() => setEditedConsultation(null)}
        onSubmit={handleUpdateConsultation}
        defaultValues={{
          date: editedConsultation?.date
            ? convertDateStringToObject(editedConsultation.date)
            : new Date(),
          time: editedConsultation?.time || '',
        }}
      />
    </>
  );
};

export default SpecialistConsultations;
