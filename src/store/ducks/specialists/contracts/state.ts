import { LoadingStatus, Response } from '../../../types';
import { SpecialistUser } from '../../specialist/contracts/state';

export interface SpecialistsState {
  specialists: SpecialistUser[] | [];
  status: LoadingStatus;
  response: Response | undefined;
}
