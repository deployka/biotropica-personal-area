import { Specialization } from '../@types/entities/Specialization';

export function formatSpecializationsToString(
  specializations: Specialization[],
): string {
  if (specializations === null) return '';
  if (!Array.isArray(specializations)) return '';
  return specializations.map(s => s.title).join(', ');
}
