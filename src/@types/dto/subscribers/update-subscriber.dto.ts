import { Subscribe } from '../../entities/Subscribe';

export enum SubscribeStatus {
  REJECTED = 'REJECTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBSCRIBE = 'SUBSCRIBE',
}

export type UpdateSubscribersDto = Readonly<{
  id: number;
  status: SubscribeStatus;
}>;

export type ResponseSubscribers = {
  data: Subscribe[];
};
