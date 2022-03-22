import { SpecializationName } from '../store/ducks/specialist/contracts/state';

export function formatSpecializationsToString(
  specializations: Array<keyof typeof SpecializationName>,
): string {
  if (specializations === null) return '';
  if (!Array.isArray(specializations)) return '';

  return specializations.join(', ');
}
