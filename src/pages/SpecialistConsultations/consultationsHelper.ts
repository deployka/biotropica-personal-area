import { format, isBefore } from 'date-fns';
import { Consultation } from '../../@types/entities/Consultation';
import { SpecialistConsultation } from '../../components/SpecialistConsultations/List/List';
import { getFullName } from '../../utils/getFullName';

export const formatConsultation = (
  consultation: Consultation,
): SpecialistConsultation => {
  let date = '';
  let time = '';
  let status: 'active' | 'inactive' = 'active';
  console.log('date', consultation.date);

  if (!consultation.date) {
    const consultationDate = new Date(consultation.date);
    date = format(consultationDate, 'dd.mm.yyyy');
    time = format(consultationDate, 'HH:MM');
    status = isBefore(consultationDate, new Date()) ? 'inactive' : 'active';
  }

  return {
    id: consultation.id,
    clientName: getFullName(consultation.user.name, consultation.user.lastname),
    status,
    date,
    time,
  };
};
