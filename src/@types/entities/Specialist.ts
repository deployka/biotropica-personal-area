import { Specialization } from './Specialization';
import { BaseUser } from './BaseUser';
import { BaseEntity } from './BaseEntity';

export type Course = {
  id: UniqueId;
  description: string;
  title: string;
  date: string;
};

export type Specialist = BaseEntity & {
  price: number;
  specializations: Specialization[];
  experience: string;
  education: string;
  user: BaseUser;
  courses: Course[];
};
