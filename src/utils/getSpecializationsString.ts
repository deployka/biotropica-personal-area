import { Specialization } from '../@types/entities/Specialization';
import { SpecializationOptions } from '../components/MultiSelect/MultiSelect';

export function getSpecializationsString(specializations: Specialization[]) {
  return (
    specializations
      .map(
        spec =>
          SpecializationOptions.find(option => option.value === spec.key)
            ?.label,
      )
      .filter(specialization => specialization)
      .join(', ') || []
  );
}
