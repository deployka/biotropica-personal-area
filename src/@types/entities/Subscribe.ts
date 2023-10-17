import { SubscribeStatus } from '../dto/subscribers/update-subscriber.dto';
import { BaseEntity } from './BaseEntity';
import { BaseUser } from './BaseUser';
import { Specialist } from './Specialist';

export type Subscribe = BaseEntity & {
    initiatorId: number;
    user: BaseUser;
    userId: number;
    specialist: Specialist;
    specialistId: number;
    status: SubscribeStatus;
};
