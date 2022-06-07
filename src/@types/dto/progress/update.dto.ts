import { ProgressPhoto } from '../../entities/Progress';

export type UpdateProgressDto = Readonly<{
  id: UniqueId;
  photos: ProgressPhoto[];
}>;
