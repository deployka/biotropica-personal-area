import { ProgressPhoto } from '../../entities/Progress';

export type CreateProgressDto = Readonly<{
  photos: ProgressPhoto[];
}>;
