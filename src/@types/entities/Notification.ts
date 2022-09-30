import { BaseEntity } from './BaseEntity';

type NotificationMoment = 'now' | 'morning' | 'noon' | 'afternoon' | 'evening';

export type Notification = BaseEntity & {
  key: NotificationKey;
  message: string;
  link: string;
  moment: NotificationMoment;
  createdAt: Date;
  data: {
    consultationId: UniqueId;
  };
};
