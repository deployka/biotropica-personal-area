import { BaseUser } from '../../entities/BaseUser';

export type BanUserDto = Required<Pick<BaseUser, 'id' | 'banReason'>>;
