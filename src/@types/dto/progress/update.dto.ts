import { ProgressPhoto } from '../../entities/Progress';

export type UpdateProgressDto = {
  id: UniqueId;
  photos: ProgressPhoto[];
};
