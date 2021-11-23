import { ISelect } from '../shared/Form/Select/SelectCustom';

export function formatSpecializationsToString(
  specializations: ISelect<string>[]
) {
  const str = specializations.reduce((acc, s) => (acc += `${s.label}, `), '');
  return str.trim().slice(0, str.length - 2);
}
