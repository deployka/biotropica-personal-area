import { Specialist } from '../../@types/entities/Specialist';

type SpecialistSearchFields = {
  fullName: string;
  price: number;
  experience: string;
};

export function searchSpecialistsByQuery(
  specialists: Specialist[],
  searchQuery: string,
) {
  const query = searchQuery.trim();
  return specialists.filter((specialist: Specialist) => {
    const formattedSpecialist: SpecialistSearchFields = {
      fullName: specialist.user.name + ' ' + specialist.user.lastname,
      price: specialist.price,
      experience: specialist.experience,
    };

    return Object.keys(formattedSpecialist).some(key => {
      return String(formattedSpecialist[key as keyof SpecialistSearchFields])
        .toLowerCase()
        .includes(query);
    });
  });
}
