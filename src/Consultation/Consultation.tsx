import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { fetchConsultationData } from '../store/ducks/consultation/actionCreators';

export const Consultation = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConsultationData(+id));
  }, [id]);
  return <div>Консультация {id}</div>;
};
