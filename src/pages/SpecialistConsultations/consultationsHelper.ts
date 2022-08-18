import { format, isBefore } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Consultation } from '../../@types/entities/Consultation';
import { SpecialistConsultation } from '../../components/SpecialistConsultations/List/List';
import { getFullName } from '../../utils/getFullName';

export const formatConsultation = (
  consultation: Consultation,
): SpecialistConsultation => {
  let date = '';
  let time = '';
  let status: 'active' | 'inactive' = 'active';

  if (consultation.date) {
    console.log(consultation.date);

    const consultationDate = new Date(consultation.date);
    date = format(consultationDate, 'dd.LL.yyyy', { locale: ru });
    time = format(consultationDate, 'HH:mm');
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

export const filterConsultationByQuery = (
  consultation: SpecialistConsultation,
  q: string,
) => {
  const query = q.toLowerCase().trim();
  const { date, time, clientName } = consultation;
  return [date, time, clientName].some(field =>
    field?.toLowerCase().includes(query),
  );
};
