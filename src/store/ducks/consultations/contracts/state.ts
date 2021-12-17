import { LoadingStatus } from '../../../types';
import { Consultation } from '../../consultation/contracts/state';

export interface ConsultationsState {
  consultations: Consultation[] | [];
  status: LoadingStatus;
  response: any;
}
