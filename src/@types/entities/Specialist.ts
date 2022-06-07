import { Specialization } from './Specialization';
import { BaseUser } from './BaseUser';

export type Course = {
  id: UniqueId;
  description: string;
  title: string;
  date: string;
};

export type Specialist = BaseUser & {
  price: number;
  specializations: Specialization[];
  experience: string;
  education: string;
  user: BaseUser;
  userId: UniqueId;
  courses: Course[];
};
